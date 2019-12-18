-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 18, 2019 at 05:02 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(4) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'Consoles', 'Video Game Consoles.', '2019-11-13 00:35:07', '2019-11-15 00:34:33'),
(2, 'Accessories', 'Accessories and peripherals for gaming.', '2019-11-13 00:35:07', '2019-11-15 00:34:33'),
(3, 'Games', 'Best selection of Video Games', '2019-11-13 00:35:07', '2019-11-15 00:34:54'),
(4, 'Televisions', 'Televisions and monitors for your gaming needs.', '2019-11-13 00:00:00', '2019-11-14 20:27:26');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(4) NOT NULL,
  `orders_id` int(4) NOT NULL,
  `products_id` int(4) NOT NULL,
  `quantity` int(4) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  `review_left` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orders_id`, `products_id`, `quantity`, `price`, `description`, `review_left`) VALUES
(1, 9, 12, 1, '59', 'Another year, another Call of Duty', 1),
(2, 9, 13, 1, '29', 'The original video game', 1),
(3, 9, 11, 1, '49', 'Another classic release from Nintendo', 1),
(4, 9, 23, 1, '110', 'okay', 0),
(5, 11, 23, 1, '110', 'okay', 0),
(6, 11, 15, 1, '899', 'A quality TV with modern resolutions', 0),
(11, 12, 13, 1, '29', 'The original video game', 1),
(13, 12, 11, 1, '49', 'Another classic release from Nintendo', 1),
(14, 12, 8, 1, '150', 'Gaming headphones with microphone!', 1),
(15, 13, 13, 1, '29', 'The original video game', 1),
(16, 13, 11, 1, '49', 'Another classic release from Nintendo', 1),
(17, 13, 7, 1, '59', 'Nintendo additional controllers', 0),
(18, 14, 23, 1, '110', 'okay', 0),
(19, 14, 13, 1, '29', 'The original video game', 1),
(20, 15, 23, 1, '110', 'okay', 0),
(21, 16, 23, 1, '110', 'okay', 0),
(22, 16, 11, 1, '49', 'Another classic release from Nintendo', 1),
(23, 17, 12, 3, '59', 'Another year, another Call of Duty', 1),
(24, 17, 23, 4, '110', 'okay', 0),
(25, 19, 23, 3, '110', 'okay', 0),
(26, 19, 11, 2, '49', 'Another classic release from Nintendo', 1),
(27, 19, 12, 3, '59', 'Another year, another Call of Duty', 1),
(28, 21, 23, 2, '110', 'okay', 0),
(29, 21, 13, 5, '29', 'The original video game', 1),
(30, 21, 11, 2, '49', 'Another classic release from Nintendo', 1),
(31, 21, 12, 2, '59', 'Another year, another Call of Duty', 1),
(32, 23, 23, 3, '110', 'okay', 0),
(37, 23, 8, 4, '150', 'Gaming headphones with microphone!', 1),
(38, 23, 9, 5, '49', 'The classic game, remastered.', 1),
(39, 25, 13, 1, '29', 'The original video game', 1),
(40, 25, 1, 1, '399', 'Microsfts Best Console', 0),
(41, 25, 5, 2, '179', 'Xbox Elite customizable computer', 0),
(42, 25, 23, 1, '110', 'okay', 0),
(43, 25, 38, 3, '199', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', 1),
(44, 25, 10, 3, '49', 'A Fast and Furious title.', 0),
(45, 27, 23, 1, '29', 'Charge Your Controllers without batteries!', 0),
(46, 27, 38, 5, '199', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', 1),
(47, 27, 38, 1, '199', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', 1),
(48, 27, 38, 1, '199', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', 1),
(49, 29, 38, 5, '199', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(4) NOT NULL,
  `created` datetime NOT NULL,
  `users_id` int(4) NOT NULL,
  `fulfilled` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `created`, `users_id`, `fulfilled`) VALUES
(9, '2019-11-28 21:09:38', 1, 1),
(10, '2019-11-28 21:16:41', 2, 0),
(11, '2019-11-30 17:28:38', 1, 1),
(12, '2019-12-01 14:41:35', 1, 1),
(13, '2019-12-01 15:02:12', 1, 1),
(14, '2019-12-06 22:14:07', 1, 1),
(15, '2019-12-06 22:18:55', 1, 1),
(16, '2019-12-06 22:19:29', 1, 1),
(17, '2019-12-08 11:00:40', 1, 1),
(19, '2019-12-08 11:45:17', 1, 1),
(21, '2019-12-08 11:51:48', 1, 1),
(23, '2019-12-08 11:53:30', 1, 1),
(25, '2019-12-08 12:07:26', 1, 1),
(26, '2019-12-17 19:26:00', 4, 0),
(27, '2019-12-17 19:47:46', 1, 1),
(29, '2019-12-18 00:23:58', 1, 1),
(31, '2019-12-18 00:24:45', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(4) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`, `image_name`) VALUES
(1, 'Xbox One', 'Microsfts Best Console', '399', 1, '2019-11-13 01:12:26', '2019-11-24 02:01:13', ''),
(2, 'Sony PS4', 'Sonys Flagship Console', '299', 1, '2019-11-13 01:12:26', '2019-12-18 01:49:07', 'sonyps4.jpg'),
(3, 'Nintendo Switch', 'Nintendos most popular console', '199', 1, '2019-11-13 01:12:26', '2019-12-18 01:49:59', 'nintendoSwitch.jpeg'),
(4, 'Gaming PC', 'A Powerful Gaming PC from NZXT', '1499', 1, '2019-11-13 01:12:26', '2019-12-18 01:50:16', 'nzxt-gaming-pc.png'),
(5, 'Xbox Elite Controller', 'Xbox Elite customizable computer', '179', 2, '2019-11-13 01:13:45', '2019-12-18 01:50:39', 'xboxelitecontroller.jpg'),
(6, 'Sony Dualshock Controller', 'Standard playstation wireless controller.', '49', 2, '2019-11-13 01:14:13', '2019-12-18 01:51:19', 'dualshock.jpeg'),
(7, 'Nintendo Joycons', 'Nintendo additional controllers', '59', 2, '2019-11-13 01:18:36', '2019-12-18 01:51:32', 'jooycons.jpeg'),
(8, 'Turtle Beach Headphones', 'Gaming headphones with microphone!', '150', 2, '2019-11-13 17:10:01', '2019-12-18 01:51:46', 'turtleBeach.jpg'),
(9, 'Pacman', 'The classic game, remastered.', '49', 3, '2019-11-13 17:11:04', '2019-12-18 01:51:58', 'pacman.jpeg'),
(10, 'Need For Speed', 'A Fast and Furious title.', '49', 3, '2019-11-13 17:12:21', '2019-12-18 01:52:13', 'needForSpeed.jpg'),
(11, 'Legend of Zelda', 'Another classic release from Nintendo', '49', 3, '2019-11-13 17:12:59', '2019-12-18 01:52:27', 'legendOfZelda.jpeg'),
(12, 'Call of Duty', 'Another year, another Call of Duty', '59', 3, '2019-11-13 19:07:34', '2019-12-18 01:52:38', 'callOfDuty.jpg'),
(13, 'Tetris', 'The original video game', '29', 3, '2019-11-13 21:12:03', '2019-12-18 01:52:53', 'tetris.png'),
(14, 'Rocket League', 'The greatest soccer game around', '19', 3, '2019-11-13 00:52:54', '2019-12-18 01:53:06', 'rocketleague.jpg'),
(15, 'LG 4K TV', 'A quality TV with modern resolutions', '899', 4, '2019-11-13 06:47:08', '2019-12-18 01:53:25', 'lgTV.jpeg'),
(16, 'Samsung QLED TV', 'A flagship product with outstanding colors.', '1999', 4, '2019-11-13 06:36:37', '2019-12-18 01:53:37', 'samsungQLED.jpg'),
(23, 'Controller Charger', 'Charge Your Controllers without batteries!', '29', 2, '2019-11-23 20:38:53', '2019-12-18 01:55:10', 'controller-charger.jpeg'),
(38, 'Xbox One S', 'This is the lower level Xbox Console that still supports 4K HDR Blu-Ray', '199', 1, '2019-12-17 18:08:32', '2019-12-18 01:08:32', 'xboxoneS.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(4) NOT NULL,
  `products_id` int(4) NOT NULL,
  `users_id` int(4) NOT NULL,
  `review` text NOT NULL,
  `stars` float NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `products_id`, `users_id`, `review`, `stars`, `created`) VALUES
(1, 23, 1, 'Testing a product review!', 5, '2019-12-17 22:43:46'),
(2, 13, 1, 'Classic awesome game!', 5, '2019-12-17 23:12:00'),
(3, 12, 1, 'This game is unbalanced garbage', 1, '2019-12-18 00:05:11'),
(4, 9, 1, '', 1, '2019-12-18 00:06:21'),
(5, 11, 1, '', 3, '2019-12-18 00:08:39'),
(6, 8, 1, 'Decent headset. Would buy upgraded version', 4, '2019-12-18 00:10:08'),
(7, 38, 1, 'Decent console. Id buy again.', 4, '2019-12-18 00:30:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `admin` int(1) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zipcode` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `admin`, `username`, `email`, `password`, `firstname`, `lastname`, `middlename`, `nickname`, `address1`, `address2`, `city`, `state`, `zipcode`) VALUES
(1, 1, 'roman', 'roman@test.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Roman', 'Parkhomenko', 'S', 'Roman', '123 ABC St', '', 'Colorado Springs', 'CO', '80927'),
(2, 0, 'test', 'test@test.com', '827ccb0eea8a706c4c34a16891f84e7b', 'test', 'test', 'S', 'Roman', '123 ABC st.', '', 'Colorado Spriongs', 'CO', '80923'),
(3, 0, 'asfasf', 'asfasf@asf.com', 'd41d8cd98f00b204e9800998ecf8427e', 'Roman', 'safs', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'class', 'class@gcu.edu', '827ccb0eea8a706c4c34a16891f84e7b', 'Class', 'GCU', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 1, 'professor', 'professor@my.gcu.edu', '827ccb0eea8a706c4c34a16891f84e7b', 'Julie', 'Wright', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_id` (`orders_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
