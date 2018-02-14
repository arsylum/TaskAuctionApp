<?php 
////////////////////////////////////////////////////////
/// the amazing task auction app demo data generator //
//////////////////////////////////////////////////////
// (the important thing is that it makes sense!) 

date_default_timezone_set('Europe/Berlin');

require('./db.conf.php');
$db = new mysqli($creds['host'], $creds['user'], $creds['pass'], $creds['base']);
if ($db->connect_error) { die('Connect Error (' . $db->connect_errno . ') ' . $db->connect_error); }

$msg = array('suc' => array(), 'err' => array());
$settings = array();


if(!$db->multi_query("DELETE FROM `bids`;
			DELETE FROM `dinners`;
			DELETE FROM `settings`;
			DELETE FROM `sponties`;
			DELETE FROM `tasks`;
			DELETE FROM `transactions`;
			DELETE FROM `users`;
			ALTER TABLE `bids` AUTO_INCREMENT = 1;
			ALTER TABLE `dinners` AUTO_INCREMENT = 1;
			ALTER TABLE `sponties` AUTO_INCREMENT = 1;
			ALTER TABLE `tasks` AUTO_INCREMENT = 1;
			ALTER TABLE `transactions` AUTO_INCREMENT = 1;
			ALTER TABLE `users` AUTO_INCREMENT = 1;
			")) {
	print('DELETE error: ' . $db->error);
} while ($db->next_result()) {} // flush multi_queries

$closing_time = (new DateTime())->add(new DateInterval('P2DT12H'));

if(!$db->multi_query("INSERT INTO `settings` (`key`, `value`) VALUES ('auction_state_override', NULL);
			INSERT INTO `settings` (`key`, `value`) VALUES ('closing_time', '" . $closing_time->format('D H:i') . "');
			INSERT INTO `settings` (`key`, `value`) VALUES ('active_week',  '" . $closing_time->format('W') . "');
			INSERT INTO `settings` (`key`, `value`) VALUES ('dinner_value', 160);")) {
	print('INSERT error: ' . $db->error);
} while ($db->next_result()) {;} // flush multi_queries

if(!$db->multi_query("INSERT INTO `users` (`name`) VALUES ('Aragorn');
			INSERT INTO `users` (`name`) VALUES ('Buffy');
			INSERT INTO `users` (`name`) VALUES ('Charlie Chaplin');
			INSERT INTO `users` (`name`) VALUES ('Darth Vader');
			INSERT INTO `users` (`name`) VALUES ('Electra');
			INSERT INTO `users` (`name`) VALUES ('Fibonacci');
			INSERT INTO `users` (`name`) VALUES ('Glurak');
			INSERT INTO `users` (`name`) VALUES ('Hunter S. Thompson');
			INSERT INTO `users` (`name`) VALUES ('Ikarus');
			INSERT INTO `users` (`name`) VALUES ('Jesus');
			INSERT INTO `users` (`name`) VALUES ('K');
			INSERT INTO `users` (`name`) VALUES ('Lorde');
			INSERT INTO `users` (`name`) VALUES ('Madonna');
			INSERT INTO `users` (`name`) VALUES ('NULL');
			INSERT INTO `users` (`name`) VALUES ('Odin');
			INSERT INTO `users` (`name`) VALUES ('Perseus');
			INSERT INTO `users` (`name`) VALUES ('QWOP');
			INSERT INTO `users` (`name`) VALUES ('Rutherford');
			INSERT INTO `users` (`name`) VALUES ('Störtebecker');
			INSERT INTO `users` (`name`) VALUES ('Tinker Bell');
			INSERT INTO `users` (`name`) VALUES ('Uwe');
			INSERT INTO `users` (`name`) VALUES ('Van Hellsing');
			INSERT INTO `users` (`name`) VALUES ('Wurst');
			INSERT INTO `users` (`name`) VALUES ('Xander Crews');
			INSERT INTO `users` (`name`) VALUES ('Ygdrassil');
			INSERT INTO `users` (`name`) VALUES ('Zaphod Beeblebrox');")) {
	print('INSERT error: ' . $db->error);
} while ($db->next_result()) {;} // flush multi_queries


$tasks = [ // type, name, description, [ fixed_value, [ status ] ] 
	['auction', 'Living Room', 'Sweep, wipe, replace candles.'],
	['auction', 'Bathroom.', 'Wipe down and disinfect(!). Make sure to unclog toilet. Use ammonia for difficult stains.'],
	['auction', 'Trash', 'Take out the trash; pay attention to using the appropriate bags (transparent/non-transparent/compostable) for the appropriate receptacle (recyclables, trash, shallow ground compost).'],
	['auction', 'Sanctuary', 'Air out. Dust sound insulation.'],
	['auction', 'Shopping', 'Refill storage, prepare ingredients for the week’s side dishes.'],

	['spontaneous', 'Vegan Spread', 'Prepare a delicious vegan bread spread!', 150],
	['spontaneous', 'New target', 'Fresh. Fresh.', 1000 ],

	['dinner', 'Monday', 'Monday is nom day'],
	['dinner', 'Tuesday', 'Tuesday is stew day'],
	['dinner', 'Wednesday', 'Wednesday is friends day'],
	['dinner', 'Thursday', 'Thursday is burp day'],
	['dinner', 'Friday', 'Fry day is high day'],
	['dinner', 'Saturday', 'Saturday is sacrifice day'],
	['dinner', 'Sunday', 'Sunday is bun day']
];

$ntasks = count($tasks);
$msql = '';
for($i=0; $i<$ntasks; $i++) {
	if(!isset($tasks[$i][3]) || is_null($tasks[$i][3])) { $tasks[$i][3] = 'null'; }
	if(!isset($tasks[$i][4]) || is_null($tasks[$i][4])) { $tasks[$i][4] = 'null'; } else { $task[$i][4] = "'" . $tasks[$i][4] . "'"; }
	$msql .= "INSERT INTO `tasks` (`type`, `name`, `description`, `fixed_value`, `status`) VALUES ('"
			. $tasks[$i][0] . "', '" . $tasks[$i][1] . "', '" . $tasks[$i][2]  . "', " . $tasks[$i][3] . ", " . $tasks[$i][4] . "); ";
}
if(!$db->multi_query($msql)) {
	print('INSERT error: ' . $db->error);
} while ($db->next_result()) {;} // flush multi_queries


// $blt = "INSERT INTO `transactions` (`uid`, `task_id`, `points`, `comment`) VALUES ";
// if(!$db->multi_query(
// 	$blt . "(17, null, 1000, 'Honorable prize for exceptional running'); "
// )){
// 	print('error on inserting transactions: ' . $db->error);
// }


$words = [
	['destroying', 'killing', 'removing', 'adding', 'caressing', 'eating', 'reinforcing', 'repairing', 'decimating', 'annihilating', 'cleaning', 'undoing', 'securing', 'fixing', 'demolishing', 'feeding', 'shooting', 'enhancing', 'improving', 'fucking', 'unleashing', 'letting'],

	['the', 'all', 'some', 'most'],
	['evil', 'fermented', 'tasty', 'reinforced', 'dead', 'bloody', 'hungry', 'obese', 'spontaneous', 'ethical', 'polyamourous', 'slutty', 'naugty', 'fake', 'alternative', 'subatomic', 'plush', 'metaphorical', 'broken', 'insane', 'scientific', 'horrifying', 'bleeding', 'fucking', 'revealing', 'rotten', 'dangerous', 'deadly', 'freestyle', 'haunting', 'nauseating', 'leaky'],
	['frog', 'bird', 'food', 'stains', 'monsters', 'debris', 'pidgeon', 'dude', 'vomit', 'blood', 'taps', 'devices', 'objects', 'material', 'machines', 'hardware', 'people', 'victims', 'sacrifices', 'porns', 'creatures', 'relics', 'merchandize', 'tools', 'evidence', 'corpses', 'organic matter', 'beast', 'plague', 'outbreak', 'contamination', 'invaders', 'enemies', 'friends', 'guests', 'investigators', 'peons', 'apprentices', 'masters', 'buns', 'sex robots', 'cake', 'leftovers', 'Tasty Thymie', 'military equipment', 'fragrances', 'experiments'],
	['with', 'with', 'carrying', 'without', 'using', 'for', 'over', 'and'],
	['a 3D laminator', 'a bun', 'lots of buns', 'a chainsaw', 'a tank', 'overwhelming force', 'love', 'the truth', 'mercy', 'a knive', 'leftovers', 'fists of steel', 'wisdom and knowledge', 'glory', 'lazer raptors', 'a gattling gun', 'a toothbrush', 'a hoover', 'Tasty Thymie', 'the extended cut collectors edition of The Lord of the Rings', 'logic and reason', 'pure luck', 'a cheeze burger', 'great pleasure', 'personal gain', 'a flamethrower', 'cat pee' , 'boobs', 'the name of the lord', 'nothing', 'anything', 'god', 'a toxic potion', 'collateral damage', 'farts', 'fun' ],
	['in', 'in', 'on', 'into', 'out of', 'next to', 'close to', 'in front of', 'straight from'],
	['the dark caverns', 'the pleasure chamber', 'the pidgeon death trap', 'the guest room', 'the sacret chamber', 'the dissolver', 'the deep well', 'the deep web', 'the bouncy castle', 'the basement', 'hell', 'the pit of trials', 'the dungeon', 'the black temple', 'space', 'the food', 'the dining room', 'the internet', 'the matrix', 'the top of my dome', 'their pants', 'the butt', 'da club', 'the forbidden realm', 'tha land of Mordor', 'grandmas armpits', 'the incinerator', 'the beyond']

]; $nwords = count($words)-1;
$msql = '';
for($i=0; $i<=42; $i++) {
	$tid = mt_rand(1, $ntasks);
	$uid = mt_rand(1,26);
	$comment = 'for ';
	for($j=0; $j<8; $j++) {
		$comment .= $words[$j][mt_rand(0,count($words[$j])-1)] . ' ';
		// $comment .= $words[mt_rand(0,$nwords)][$j] . ' ';
	}
	// $plode = explode(' ', $comment, 4);
	// $comment = ''; $k=mt_rand(1,3);
	// for($j=0; $j<4; $j++){
	// 	if($k === $j) { $comment .= $tasks[$tid-1][1] . " "; }
	// 	$comment .= $plode[$j] . " ";
	// }
	// print($comment . "\n");
	$msql .= "INSERT INTO `transactions` (`uid`, `task_id`, `points`, `comment`, `ip`, `time`) VALUES ("
			. $uid . ", " . $tid . ", " 
			. floor(log(mt_rand(0,2000)/777 + 0.000001) * 1337) . ", '"
			. $comment . "', "
			. mt_rand() . ", '"
			. date("Y-m-d H:i:s", mt_rand()) . "'); ";
}
if(!$db->multi_query($msql)){
	print('error on inserting transactions: ' . $db->error);
} while ($db->next_result()) {;} // flush multi_queries


// bids & claims (needs adjustments when $tasks changes)
$msql = ''; $lastp = array();
for($i=0;$i<=65; $i++){
	$k = mt_rand(0,20);
	$uid = mt_rand(1,26);
	if($k < 15) {
		$tid = mt_rand(1,5);
		if(!isset($lastp[$tid])) { $lastp[$tid] = mt_rand(255,3950); }
		if(mt_rand(0,5) > 1) {
			$suf = $lastp[$tid] . ", true";
		} else {
			$lastp[$tid] = mt_rand(1, $lastp[$tid]);
			$suf = $lastp[$tid] . ", false";
		}
		$msql .= "INSERT INTO `bids` (`uid`,`task_id`,`points`,`collab`) VALUES ("
				. $uid . ", " . mt_rand(1,5) . ", " . $suf . "); ";
	} elseif($k < 17) {
		$msql .= "INSERT INTO `sponties` (`uid`, `task_id`) VALUES ("
				. $uid . ", " . mt_rand(6,7) . "); ";
	} else {
		$msql .= "INSERT INTO `dinners` (`uid`, `task_id`) VALUES ("
				. $uid . ", " . mt_rand(8,14) . "); ";
	}
}
if(!$db->multi_query($msql)){
	print('error on inserting transactions: ' . $db->error);
} while ($db->next_result()) {;} // flush multi_queries



// update points & stats
for($i=1; $i<27; $i++) { update_user_points($i); }
calculate_dashboard_stats();





// copypasta from slingshot
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

	if ($res = $db->query("SELECT `uid`,`points`,`time` FROM `transactions`", MYSQLI_USE_RESULT)) {
		while($row = $res->fetch_object()) { 
			$time = (new DateTime($row->time))->getTimestamp();
			if($time >= $last4wstart) {
				$uid = intval($row->uid);
				$points = floatval($row->points);
				if(!isset($users[$uid])) { $users[$uid] = array('4w' => 0, '1w' => 0); }
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

die('okay');