-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2018 at 02:57 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskauction`
--

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `collab` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dinners`
--

CREATE TABLE `dinners` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `key` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`key`, `value`) VALUES
('active_week', NULL),
('auction_state_override', NULL),
('closing_time', 'Tue 22:00'),
('dinner_value', '150');

-- --------------------------------------------------------

--
-- Table structure for table `sponties`
--

CREATE TABLE `sponties` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('auction','spontaneous','dinner','') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fixed_value` int(11) DEFAULT NULL,
  `status` enum('done','failed','irrelevant','deleted') COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`name`, `description`, `type`, `fixed_value`, `status`) VALUES
('Monday', 'Mondays are not edible. Make something better!', 'dinner', NULL, NULL),
('Tuesday', 'So Hungary', 'dinner', NULL, NULL),
('Wednesday', 'Wednesdinnerready??', 'dinner', NULL, NULL),
('Thursday', 'Eating seeds as a passtime activity', 'dinner', NULL, NULL),
('Friday', 'Fry day is hi day!', 'dinner', NULL, NULL),
('Saturday', 'Why are cheese people so hamry?', 'dinner', NULL, NULL),
('Sunday', 'Sunday is bun day! Or alternatively any other kind of food.', 'dinner', NULL, NULL),
('Monday', 'Mondays are not edible. Make something better!', 'lunch', NULL, NULL),
('Tuesday', 'So Hungary', 'lunch', NULL, NULL),
('Wednesday', 'Wedneslunchready??', 'lunch', NULL, NULL),
('Thursday', 'Eating seeds as a passtime activity', 'lunch', NULL, NULL),
('Friday', 'Fry day is hi day!', 'lunch', NULL, NULL),
('Saturday', 'Why are cheese people so hamry?', 'lunch', NULL, NULL),
('Sunday', 'Sunday is bun day! Or alternatively any other kind of food.', 'lunch', NULL, NULL),
('Task Auction integration work', 'So we got this shiny new system that will save all our lives. But someone has to take charge of integrating it into our current lifestyle. Or maybe we all have to do this together?', 'auction', NULL, 'irrelevant'),
('Create a task', 'There are not enough tasks yet. Create some new ones!', 'spontaneous', 80, NULL),
('Submit a bug report', 'Crawling around all over the place - I am sure you have found some?', 'spontaneous', 140, NULL),
('Sign up all the users into the system', 'There is not too much to it really. Click on \'Select User\' (or the current user name) then switch user, type your name and create!', 'auction', NULL, 'irrelevant'),
('Find the hidden settings', 'The auction closing time and the value for cooking meals can not be configured in the UI. Are you a real hacker and know how to do it anyway? Documentation? *ugh*', 'auction', NULL, 'irrelevant'),
('Get rid of these annoying demo tasks', 'Rename/edit them, or delete them whatever suits your needs, but definitely add new ones. The more the merrier!', 'auction', NULL, 'irrelevant');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(11) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED DEFAULT NULL,
  `points` float NOT NULL,
  `comment` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` bigint(20) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `house_id` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` float NOT NULL,
  `points_lastweek` float DEFAULT NULL,
  `points_avg_fourweeks` float DEFAULT NULL,
  `points_avg_total` float DEFAULT NULL,
  `joindate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `house_id`, `name`, `points`, `points_lastweek`, `points_avg_fourweeks`, `points_avg_total`, `joindate`) VALUES
(70, NULL, 'John Doe', 0, NULL, NULL, NULL, '2018-01-11 02:39:23'),
(71, NULL, 'Jane Dane', 0, NULL, NULL, NULL, '2018-01-11 02:40:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dinners`
--
ALTER TABLE `dinners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `sponties`
--
ALTER TABLE `sponties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bids`
--
ALTER TABLE `bids`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=770;

--
-- AUTO_INCREMENT for table `dinners`
--
ALTER TABLE `dinners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sponties`
--
ALTER TABLE `sponties`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
