<?php 
////////////////////////////////////////////
/// the amazing task auction app backend //
//////////////////////////////////////////
// (just a simple database adapter)

date_default_timezone_set('Europe/Berlin');


// TODO remove this shit for production <- HAHA
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

 
if(!isset($_POST['action'])) { die('Invalid backend call!'); }

require('./db.conf.php');
$db = new mysqli($creds['host'], $creds['user'], $creds['pass'], $creds['base']);
if ($db->connect_error) { die('Connect Error (' . $db->connect_errno . ') ' . $db->connect_error); }
$db->set_charset("utf8mb4"); // force the same encoding as in our sample sql

$msg = array('suc' => array(), 'err' => array());
$settings = array();

switch($_POST['action']) {
	case 'get_state': return_state(); break;
	case 'update_auctionState': update_auctionState(); break;
	case 'add_user': add_user(); break;
	case 'add_task': add_task(); break;
	case 'edit_task': edit_task(); break;
	case 'delete_task': delete_task(); break;
	case 'undelete_task': undelete_task(); break;
	case 'new_bid': new_bid(); break;
	case 'collab': collab(); break;
	case 'update_task_status': update_task_status(); break;
	case 'dinner_take':  dinner_take(); break;
	case 'dinner_join': dinner_join(); break;
	case 'dinner_bail': dinner_bail(); break;
	case 'spont_take': spont_take(); break;
	case 'spont_bail': spont_bail(); break;
	case 'add_transaction': add_transaction(); break;
	case 'iterate_to_next_week': iterate_to_next_week(); break;
	case 'update_settings': update_settings(); break;
  	case 'get_dashboard': return_dashboard(); break;
	default: return_state();
}


function randomMsg($options) {
	return $options[random_int(0, (count($options) - 1))];
}

function return_state($state = null) { 
	if(is_null($state)) { $state = retrieve_state(); }
	print(json_encode($state)); 
	exit; 
}
function retrieve_state($include_uidMap = false) {
	global $db, $msg;
	$state = array('messages' => $msg);
	$uid_map = array();

	/////////////
	/// USERS //
	///////////
	if ($res = $db->query("SELECT * FROM `users`", MYSQLI_USE_RESULT)) {
		$state['users'] = array();
		while($row = $res->fetch_object()) {
			$uid_map[$row->id] = count($state['users']); // get a pointer from id to array index
			array_push($state['users'], array(
				'id' => $row->id,
				'name' => $row->name,
				'points' => $row->points,
				'favtasks' => array(),
				'transactions' => array()
			));
		}
	    $res->close();
	}

	/////////////
	/// TASKS //
	///////////
	if ($res = $db->query("SELECT * FROM `tasks`", MYSQLI_USE_RESULT)) {
		$state['tasks'] = array('auction' => array(), 'spontaneous' => array(), 'dinner' => array(), 'deleted' => array());
		while($row = $res->fetch_object()) {
			if($row->status !== 'deleted') {
				array_push($state['tasks'][$row->type], array(
					'id' => intval($row->id),
					'name' => $row->name,
					'description' => $row->description,
					'type' => $row->type,
					'fixed_value' => $row->fixed_value,
					'status' => $row->status,
					'winners' => array()
				));
			} else { // ugly repetitions yay ^^
				$state['tasks']['deleted'][] = array(
					'id' => intval($row->id),
					'name' => $row->name,
					'description' => $row->description,
					'fixed_value' => $row->fixed_value,
					'type' => $row->type,
					'status' => 'deleted'
				);
			}
		}
	    $res->close();
	}


	////////////
	/// BIDS //
	//////////								 // make sure collab bids are processed last
	if ($res = $db->query("SELECT * FROM `bids` ORDER BY `time` ASC")) {

		while($row = $res->fetch_object()) {
			$uid = intval($row->uid);
			$tid = intval($row->task_id);
			$points = intval($row->points);
			$time = DateTime::createFromFormat("Y-m-d H:i:s", $row->time)->getTimestamp();
			$collab = boolval($row->collab);

			// build user fav lists			
			if(isset($uid_map[$uid])
			&& !in_array($tid, $state['users'][$uid_map[$uid]]['favtasks'])) {
				$state['users'][$uid_map[$uid]]['favtasks'][] = $tid;
			}


			foreach($state['tasks'] as $type => $list) {
				$i = count($list);
				while($i-- && $list[$i]['id'] !== $tid) {}
				if($i >= 0) {
					if(!isset($list[$i]['min'])) { // first bid
						$state['tasks'][$type][$i]['min'] = $points;
						$state['tasks'][$type][$i]['bid'] = $points; //getTasksAveragePoints($tid) * 2;// max($points, (getTasksAveragePoints($tid) * 2));
						$state['tasks'][$type][$i]['winners'] = array($uid);
					} elseif ($list[$i]['min'] > $points ) { //new lowest bid
						
						$state['tasks'][$type][$i]['bid'] = $state['tasks'][$type][$i]['min'] - 1;
						$state['tasks'][$type][$i]['min'] = $points;
						$state['tasks'][$type][$i]['winners'] = array($uid);
					} elseif ($list[$i]['min'] === $points && $collab) { // collab
						$state['tasks'][$type][$i]['winners'][] = $uid;
					} elseif ($list[$i]['bid'] >= $points ) { //new lowering bid
						$state['tasks'][$type][$i]['bid'] = $points; //max($list[$i]['min'], $points - 1);
					}

				}
			}
		}
	    $res->close();
	}

	////////////////
	/// Sponties //
	//////////////
	if ($res = $db->query("SELECT * FROM `sponties`")) {
		$n = count($state['tasks']['spontaneous']);
		while($row = $res->fetch_object()) {
			$tid = intval($row->task_id);
			$i = $n;
			while($state['tasks']['spontaneous'][--$i]['id'] !== $tid && $i >= 0) {}
			if($i>=0) { $state['tasks']['spontaneous'][$i]['winners'][] = intval($row->uid); }

		}
		$res->close();
	}

	///////////////
	/// Dinners //
	/////////////
	if ($res = $db->query("SELECT * FROM `dinners`")) {
		$n = count($state['tasks']['dinner']);
		while($row = $res->fetch_object()) {
			$tid = intval($row->task_id);
			$i = $n;
			while($state['tasks']['dinner'][--$i]['id'] !== $tid && $i >= 0) {}
			$state['tasks']['dinner'][$i]['winners'][] = intval($row->uid);

		}
		$res->close();
	}

	////////////////////
	/// Transactions //
	//////////////////
	if ($res = $db->query("SELECT * FROM `transactions` ORDER BY `time` DESC;", MYSQLI_USE_RESULT)) {
		while($row = $res->fetch_object()) {
			$uid = intval($row->uid);
			if(isset($uid_map[$uid])) {
				// var_dump($row->ip);
				$state['users'][$uid_map[$uid]]['transactions'][] = array(
					'id' => intval($row->id),
					'task_id' => $row->task_id,
					'points' => floatval($row->points),
					'comment' => $row->comment,
					'ip' => long2ip(intval($row->ip)),
					'time' => $row->time
				);
			}
		}
	    $res->close();
	}

	////////////////
	/// Settings //
	//////////////
	$state['settings'] = getSettings();
	$state['settings']['auctionState'] = getAuctionState();


	if($include_uidMap) { $state['uid_map'] = $uid_map; }
	return $state;
}

function getSettings() {
	global $db, $settings;
	if(count($settings) < 1) {
		if ($res = $db->query("SELECT * FROM `settings`", MYSQLI_USE_RESULT)) {
			// $state['settings'] = array();
			while($row = $res->fetch_object()) {
				$settings[$row->key] = $row->value;

			}
		    $res->close();
		}
	}
	return $settings;
}

function getAuctionState() {

    $settings = getSettings();

    if(!is_null($settings['auction_state_override'])) {
    	$auction_state = intval($settings['auction_state_override']);
    } else {
	    $now = new DateTime();
	    $closingTime = DateTime::createFromFormat('D H:i', $settings['closing_time']);
	    $closingTime->setISODate(intval($closingTime->format('Y')), intval($settings['active_week']), intval($closingTime->Format('N')));
	    $currentWeek = $closingTime->format('W');

	    if(intval($settings['active_week']) >= intval($currentWeek)
		&& $now->getTimestamp() < $closingTime->getTimestamp()) {
	    	$auction_state = 0;
		} else { $auction_state = 1; }
	}
    return $auction_state;
}

function getTasksAveragePoints($tid) {
	global $db;
	$total = 0; $count = 0;
	if ($res = $db->query("SELECT `points` FROM `transactions` WHERE `task_id` = " . $tid . ";")) {
		while($row = $res->fetch_object()) {
			$count++;
			$total += abs(intval($row->points));
		}
	    $res->close();
	}
	if($count > 0) { return intval($total / $count); }
	else { return 2000; } // default init value
}

function update_auctionState() {
	global $db;
	$newState = intval($_POST['newState']);
	if(empty($_POST['newState'])) { $newState = "NULL"; }

	if(!$db->query("UPDATE `settings` SET `value` = " . $newState . " WHERE `key` = 'auction_state_override';")) {
		die($db->error);
	}
	return_state();
}

function add_task() {
	global $db;

	$name = $db->real_escape_string($_POST['name']);
	$desc = $db->real_escape_string($_POST['description']);
	$type = $db->real_escape_string($_POST['type']);
	// echo "INSERT INTO `tasks` (`name`, `description`, `type`) 
		// VALUES('" . $name . "', '" . $desc . "', '" . $type . "');";
	// TODO fixed value
	if(!$db->query("INSERT INTO `tasks` (`name`, `description`, `type`) 
		VALUES('" . $name . "', '" . $desc . "', '" . $type . "');")) {
		die($db->error);
	}
	return_state();
}

function edit_task() {
	global $db;
	$tid = intval($_POST['id']);
	$type = $_POST['type'];
	$fix = '';
	if($type === 'spontaneous') { $fix = ", `fixed_value` = " . intval($_POST['fixed_value']); }

	if(!$db->query("UPDATE `tasks` SET 
		`name` = '" . $db->real_escape_string($_POST['name']) . "', 
		`description` = '" . $db->real_escape_string($_POST['description']) . "',
		`type` = '" . $db->real_escape_string($_POST['type']) . "'
		" . $fix . "
		WHERE `id` = " . $tid . ";")) { die($db->error); }

	return_state();


}

function delete_task() {
	global $db;

	$tid = intval($_POST['id']);
	if(!$db->query("UPDATE `tasks` SET `status` = 'deleted' WHERE `id` = " . $tid . ";")) {
		die($db->error);
	}
	return_state();
}

function undelete_task() {
	global $db;

	$tid = intval($_POST['id']);
	if(!$db->query("UPDATE `tasks` SET `status` = null WHERE `id` = " . $tid . ";")) {
		die($db->error);
	}
	return_state();
}


function new_bid() {

	// TODO conflict testing...nope
	global $db, $msg;

	$uid = intval($_POST['uid']);
	$tid = intval($_POST['task_id']);
	$points = intval($_POST['points']);

	$win = (is_null($db->query("SELECT `points` FROM `bids` WHERE `task_id` = " . $tid . " AND `points` <= " . $points . ";")->fetch_object()));

	
	if(getAuctionState() !== 0) {
		$msg['err'][] = 'Auction is over. Bidding strictly prohibited.';
	} elseif($points < 0) {
		$msg['err'][] = randomMsg(array(
			'What\s with all this negativity?',
			'The wrath of the tasks is upon you!',
			'Nope',
			'Don\'t be a cheap slut'
		));
	} else {

		if(!$db->query("INSERT INTO `bids` (`uid`, `task_id`, `points`) 
			VALUES (" . $uid . ", " . $tid . ", " . $points . ");")) {
			$msg['err'][] = 'Database Error: ' . $db->error;
		} 
	}
	if(!$win) {
		$msg['err'][] = randomMsg(array(
			'That won\'t do. Too expensive!',
			'Someone underbid you already!',
			'Ohhhhhh, not cheap enough.',
			'The competition is vicious!',
			'You lowered the value of this task. But it\'s not yours. Happy?',
			'Try placing a serious bit, maybe?',
			'You really thought, that cheap would be acceptable?',
			'What a miserable bid!',
			'Och och och. No.'
		));
	} else {
		$msg['suc'][] = randomMsg(array(
			'You\'re a hero!',
			'Bidding on those taks, like a pro!',
			'This thask shall b thyne',
			'Taskicious!',
			'Tasktastic!',
			'Y-y-yy-yyyeaah!',
			'Rock that task!',
			'Remember to take a break from heavy tasking when you have a seizure',
			'Rock that Zipfel!',
			'Task time!',
			'Leave some tasks for the rest of us, ok?',
			'One taks a day keeps the chaos at bay!',
			'A task is a task is a task',
			'Everyone has a price. Every task does too!',
			'Och och och',
			'Mmeeaooowww',
			'Task\'s what she said!',
			'Remember to take a 10-15 minute break every hour, even if you don\'t think you need it',
			'So many tasks so little time',
			'Squeeze those tasks!',
			'Essen!'
		));
	}
	return_state();

}

function collab() {

	// TODO conflict testing?
	
	global $db;
	if(!$db->query("INSERT INTO `bids` (`uid`, `task_id`, `points`, `collab`) 
		VALUES (" . intval($_POST['uid']) . ", " . intval($_POST['task_id']) . ", " . intval($_POST['points']) . ", true);")) {
		die($db->error);
	}
	return_state();
}

function update_task_status() {
	global $db;

	if(empty($_POST['status'])) { $status = "null"; }
	else { $status = "'" . $db->real_escape_string($_POST['status']) . "'"; }

	if(!$db->query("UPDATE `tasks` SET `status` = " . $status . " WHERE `id` = " . intval($_POST['id']))) {
		die($db->error);
	}
	return_state();
}

function dinner_take() {
	global $db, $msg;

	$tid = intval($_POST['task_id']);
	if(!$db->query("DELETE FROM `dinners` WHERE `task_id` = " . $tid)) { die($db->error); }
	if(!$db->query("INSERT INTO `dinners` (`uid`, `task_id`) VALUES (" . intval($_POST['uid']) . ", " . $tid . ");")) { die($db->error); }
	$msg['suc'][] = randomMsg(array(
		'Be sure to use the food in need of consumption!',
		'D-ddddd-d licious!',
		'I hope it\'s gonna be buns',
		'Gotta feed them all!',
		'Saliva of the phattest!',
		'Beat the tofu!',
		'May the sauce be with you!',
		'Cook dat mett!'
	));
	return_state();
}

function dinner_join() {
	global $db, $msg;

	$tid = intval($_POST['task_id']);

	$res = $db->query("SELECT `uid` FROM `dinners` WHERE `uid` = " . intval($_POST['uid']) . " AND `task_id` = " . $tid . ";");
	if($res->num_rows > 0) {
		$msg['err'][] = 'No cooky twicey!!';
	} else {


		if(!$db->query("INSERT INTO `dinners` (`uid`, `task_id`) VALUES (" . intval($_POST['uid']) . ", " . $tid . ");")) { die($db->error); }

		$msg['suc'][] = randomMsg(array(
			'Be sure to use the food in need of consumption!',
			'D-ddddd-d licious!',
			'I hope it\'s gonna be buns',
			'Gotta feed them all!',
			'Saliva of the phattest!',
			'Beat the tofu!',
			'May the sauce be with you!',
			'Cook dat mett!'
		));

	// $msg['suc'][] = randomMsg(array(
	// 	'Dream team cream!',
	// 	'Teamwork unlocks supper powers!',
	// 	'Taste the power of friendship!'
	// ));
	}
	return_state();
}

function dinner_bail() {
	global $db, $msg;
	if(!$db->query("DELETE FROM `dinners` WHERE `task_id` = ". intval($_POST['task_id']) . " AND `uid` = " . intval($_POST['uid']) . ";")) {
		die($db->error);
	}
	$msg['err'][] = randomMsg(array(
		'Billions of years of evolution starved to extinction. Because of you!',
		'DOOOOOOOOOOOOOOOOOOOOOOOM!',
		'That\'t not tasy.',
		'Coward! Those foods need real heroes to save em!',
		'You\'re not getting any buns!'
	));
	return_state();
}

function spont_take() {
	global $db, $msg;

	if(!$db->query("INSERT INTO `sponties` (`uid`, `task_id`) VALUES (" . intval($_POST['uid']) . ", " . intval($_POST['task_id']) . ");")) {
		die($db->error);
	}
	$msg['suc'][] = randomMsg(array(
		'Good job!',
		'You made the world a better place.',
		'That was very spontaneous!',
		'That was very spontyamorous!',
		'Very ethical!'
	));
	return_state();
}

function spont_bail() {
	global $db, $msg;

	if(!$db->query("DELETE FROM `sponties` WHERE 
		`uid` = " . intval($_POST['uid']) . " AND 
		`task_id` = " . intval($_POST['task_id']) . " LIMIT 1;")) {
		die($db->error);
	}
	$msg['err'][] = randomMsg(array(
		'Traitor!',
		'We expected more from you.',
		'More sponge than spontaneous..',
		'You were just in for the points anyway.'
	));
	return_state();
}

function add_user() {
	global $db;
	if(!$db->query("INSERT INTO `users` (`name`, `points`) 
		VALUES ('" . $db->real_escape_string($_POST['name']) . "', 0);")) {
		die($db->error);
	}
	return_state();
}

function add_transaction() {
	global $db;

	$uid = intval($_POST['uid']);
	$task_id = $db->real_escape_string($_POST['task_id']);
	$points = floatval($_POST['points']);
	$comment = $db->real_escape_string($_POST['comment']); 
	
	createTransaction($uid, $task_id, $points, $comment, null);
	update_user_points($uid);

	return_state();
	
}

function createTransaction(
$uid,
$task_id,
$points,
$comment,
$ip = null
) {
	global $db;

	if(is_null($ip)) { $ip = ip2long($_SERVER['REMOTE_ADDR']); }


	$fields = "`uid`, ";
	if(!empty($task_id)) { $fields .= "`task_id`, "; } 
	$fields .=	"`points`, `comment`, `ip`";

	$values = "'" . intval($uid) . "', ";
	if(!empty($task_id)) { $values .= "'" . $task_id . "', "; }
	$values .=	"'" . floatval($points) . "', '" . $db->real_escape_string($comment) . "', '" . $ip . "'";

	$sql = "INSERT INTO `transactions` (" . $fields . ") VALUES (" . $values . ");";
	if(!$db->query($sql)) {	die($db->error); }
	// var_dump($_POST);
	// var_dump($task_id);
	// var_dump($sql);

	// var_dump($ip);
	// var_dump($_POST);
	// var_dump($_SERVER);

}

function update_settings() {
	global $db, $msg;


	if(!$db->query("UPDATE `settings` SET `value` = '" . intval($_POST['dinner_value']) . "' WHERE `key` = 'dinner_value';")) { die($db->error); }
	if(!$db->query("UPDATE `settings` SET `value` = '" . $db->real_escape_string($_POST['closing_time']) . "' WHERE `key` = 'closing_time';")) { die($db->error); }

	$msg['suc'][] = 'Should be fine!';
	return_state();

}

function iterate_to_next_week() {
	global $db, $msg, $settings;
	$state = retrieve_state(true); // with uid_map

	$positives = array(
		'Such a hero!',
		'Wuoooouuu!',
		'Most excellentastic.',
		'Like a swiss train!',
		'Yassss!',
		'Swank!',
		'Angemessen.',
		'Owkay',
		'schwifty!',
		'Hearty Luckwish!',
		'Bam oida!',
		'Ja Hobedere',
		'Oida Lan!',
		'A true master!',
		'Like a baowzz!',
		'Epic',
		'The task is happy!'
	);
	$negatives = array(
		'Nooooooooouu!',
		'How dissapoint.',
		'Inacceptable.',
		'Come on!',
		'WTF',
		'You can do better!',
		'Abgelehnt',
		'Sittenwidrig!',
		'Naja',
		'Zefix!'
	);
	$uids = array();
	// auctions
	foreach($state['tasks']['auction'] as $key => $task) {
		// TODO check status?
		if($task['status'] !== 'irrelevant' && $task['status'] !== 'deleted' && count($task['winners']) > 0) {
			$penalty = 0;
			$points = floatval($task['bid']) / count($task['winners']);
			if($task['status'] === 'failed') { $points = (-1) * $points; }
			if($points < 0 && $points > -50) { $penalty = (floatval($task['bid']) - 50) / count($task['winners']); }
			

			$comment = ($task['status'] === 'failed' ? 'Neglected' : 'Completed') . ' the task ' . $task['name'] . '. ' .
				($task['status'] === 'failed' ?
					randomMsg($negatives) :
					randomMsg($positives));

			foreach($task['winners'] as $winner) {
				if(!in_array($winner, $uids)) { $uids[] = $winner; }
				createTransaction($winner, $task['id'],	$points, $comment);
				if($penalty < 0) { createTransaction($winner, null, $penalty, 'Minimum penalty rule. Additional damage for failing ' . $task['name'] . '.'); }
			}
		}
	}
	// dinners
	$dinval = intval($state['settings']['dinner_value']);
	foreach($state['tasks']['dinner'] as $key => $dinner) {
		if(count($dinner['winners']) > 0) {
			foreach($dinner['winners'] as $winner) {
				if(!in_array($winner, $uids)) { $uids[] = $winner; }
				createTransaction($winner, $dinner['id'], $dinval, 'Cooked dinner on ' . $dinner['name'] . '. ' . randomMsg($positives));
			}
		}
	}

	// spontaneous
	foreach($state['tasks']['spontaneous'] as $key => $spont) {
		if(count($spont['winners']) > 0) {
			foreach($spont['winners'] as $winner) {
				if(!in_array($winner, $uids)) { $uids[] = $winner; }
				createTransaction($winner, $spont['id'], $spont['fixed_value'], 'Did a spontaneous ' . $spont['name'] . '. ' . randomMsg($positives));
			}
		}
	}

	// recalculate all the points
	foreach($uids as $uid) { update_user_points($uid); }

	// drop all the bids
	if(!$db->query("DELETE FROM `bids`;")) { die($db->error); }
	// drop all the dinner claims
	if(!$db->query("DELETE FROM `dinners`;")) { die($db->error); }
	// drop all the sponties
	if(!$db->query("DELETE FROM `sponties`;")) { die($db->error); }

	// reset tasks stati
	if(!$db->query("UPDATE `tasks` SET `status` = NULL WHERE `status` != 'deleted';")) { die($db->error); }

	// update active week
	$nextWeek = DateTime::createFromFormat('D H:i', $state['settings']['closing_time']);
	while($nextWeek->getTimestamp() < time()) { $nextWeek->add(new DateInterval('P1W')); }
	if(!$db->query("UPDATE `settings` SET `value` = '" . $nextWeek->format('W') . "' WHERE `key` = 'active_week';")) { die($db->error); }


	// generate new dashboard stats
	calculate_dashboard_stats();

	$settings = array(); // unset to correctly re-calculate auction state
	return_state();

}


function update_user_points($uid) {
	global $db;

	$points = 0;
	if ($res = $db->query("SELECT `points` FROM `transactions` WHERE `uid` = " . $uid, MYSQLI_USE_RESULT)) {
		while($row = $res->fetch_object()) { $points += $row->points; }
	    $res->close();
	}

	if(!$db->query("UPDATE `users` SET `points` = '" . $points . "' WHERE `id` = " . $uid)) {
		die($db->error);
	}
}

function calculate_dashboard_stats() {
	global $db;

	// TODO this method will give false results under some circumstances (like changing plenum times...)
	$last1wstart = (new DateTime())->getTimestamp() - (3600*24*1); // up to 24 hours ago (stuff that happened in the plenum)
	$last4wstart = (new DateTime())->getTimestamp() - (3600*24*27); // 27 days ago (passed 4 weeks)

	$users = array();
	if ($res = $db->query("SELECT `id` FROM `users`", MYSQLI_USE_RESULT)) {
		while($row = $res->fetch_object()) { $users[intval($row->id)] = array('4w' => 0, '1w' => 0); }
		$res->close();
	}
	
	if ($res = $db->query("SELECT `uid`,`points`,`time` FROM `transactions`", MYSQLI_USE_RESULT)) {
		while($row = $res->fetch_object()) { 
			$time = (new DateTime($row->time))->getTimestamp();
			if($time >= $last4wstart) {
				$uid = intval($row->uid);
				$points = floatval($row->points);
				$users[$uid]['4w'] += $points;
				if($time >= $last1wstart) { $users[$uid]['1w'] += $points; }
			}
		}
	    $res->close();
	}
	foreach($users as $uid => $p) {
		if($p['1w'] === 0) { $p['1w'] = 'null'; }
		if($p['4w'] === 0) { $p['4w'] = 'null'; } else { $p['4w'] = $p['4w'] / 4; }
		if(!$db->query("UPDATE `users` SET 
			`points_lastweek` = " . $p['1w'] . ", 
			`points_avg_fourweeks` = " . $p['4w'] . " WHERE `id` = " . $uid)) {
			die($db->error);
		}
	}
}

function return_dashboard() {
  global $db;


	if ($res = $db->query("SELECT * FROM `users`;", MYSQLI_USE_RESULT)) {
    $dashboard = array();
		while($row = $res->fetch_object()) {
			array_push($dashboard, array(
				'id' => intval($row->id),
				'name' => $row->name,
				'points' => intval($row->points),
		        'points_lastweek' => $row->points_lastweek,
		        'points_avg_fourweeks' => $row->points_avg_fourweeks,
		        'points_avg_total' => $row->points_avg_total,
		        //'weeksparticipated' => // how many weeks since join date?
			));
		}
	    $res->close();
	}
	print(json_encode($dashboard)); 
  exit;
}
