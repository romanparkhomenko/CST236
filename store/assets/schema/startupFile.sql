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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(4) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`) VALUES
(1, 'Xbox One', 'Microsfts Best Console', '399', 1, '2019-11-13 01:12:26', '2019-11-24 02:01:13'),
(2, 'Sony PS4', 'Sonys Flagship Console', '299', 1, '2019-11-13 01:12:26', '2019-11-15 00:12:26'),
(3, 'Nintendo Switch', 'Nintendos most popular console', '199', 1, '2019-11-13 01:12:26', '2019-11-15 00:12:26'),
(4, 'Gaming PC', 'A Powerful Gaming PC from NZXT', '1499', 1, '2019-11-13 01:12:26', '2019-11-14 09:12:21'),
(5, 'Xbox Elite Controller', 'Xbox Elite customizable computer', '179', 2, '2019-11-13 01:13:45', '2019-11-14 09:13:39'),
(6, 'Sony Dualshock Controller', 'Standard playstation wireless controller.', '49', 2, '2019-11-13 01:14:13', '2019-11-14 09:14:08'),
(7, 'Nintendo Joycons', 'Nintendo additional controllers', '59', 2, '2019-11-13 01:18:36', '2019-11-14 09:18:31'),
(8, 'Turtle Beach Headphones', 'Gaming headphones with microphone!', '150', 2, '2019-11-13 17:10:01', '2019-11-15 01:09:51'),
(9, 'Pacman', 'The classic game, remastered.', '49', 3, '2019-11-13 17:11:04', '2019-11-15 01:10:54'),
(10, 'Need For Speed', 'A Fast and Furious title.', '49', 3, '2019-11-13 17:12:21', '2019-11-15 01:12:11'),
(11, 'Legend of Zelda', 'Another classic release from Nintendo', '49', 3, '2019-11-13 17:12:59', '2019-11-15 01:12:49'),
(12, 'Call of Duty', 'Another year, another Call of Duty', '59', 3, '2019-11-13 19:07:34', '2019-11-15 03:07:34'),
(13, 'Tetris', 'The original video game', '29', 3, '2019-11-13 21:12:03', '2019-11-15 05:12:03'),
(14, 'Rocket League', 'The greatest soccer game around', '19', 3, '2019-11-13 00:52:54', '2019-11-14 08:52:54'),
(15, 'LG 4K TV', 'A quality TV with modern resolutions', '899', 4, '2019-11-13 06:47:08', '2019-11-14 12:47:08'),
(16, 'Samsung QLED TV', 'A flagship product with outstanding colors.', '1999', 4, '2019-11-13 06:36:37', '2019-11-14 12:36:37'),
(23, 'New Video', 'okay', '110', 2, '2019-11-23 20:38:53', '2019-11-24 03:47:41');

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
(2, 0, 'test', 'test@test.com', '827ccb0eea8a706c4c34a16891f84e7b', 'test', 'test', 'S', 'Roman', '123 ABC st.', '', 'Colorado Spriongs', 'CO', '80923');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
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
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
