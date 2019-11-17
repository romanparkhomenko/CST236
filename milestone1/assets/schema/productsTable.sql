CREATE TABLE `products` (
  `id` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` decimal (10.0) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`) VALUES
(1, 'Xbox One', 'Microsofts Flagship console' , '299', 1, '2019-11-13 01:12:26', '2019-11-14 17:12:26'),
(2, 'Sony PS4', 'Sonys Flagship Console', '299', 1, '2019-11-13 01:12:26', '2019-11-14 17:12:26'),
(3, 'Nintendo Switch', 'Nintendos most popular console', '199', 1, '2019-11-13 01:12:26', '2019-11-14 17:12:26'),
(4, 'Gaming PC', 'A Powerful Gaming PC from NZXT', '1499', 1, '2019-11-13 01:12:26', '2019-11-14 02:12:21'),
(5, 'Xbox Elite Controller', 'Xbox Elite customizable computer', '179', 2, '2019-11-13 01:13:45', '2019-11-14 02:13:39'),
(6, 'Sony Dualshock Controller', 'Standard playstation wireless controller.', '49', 2, '2019-11-13 01:14:13', '2019-11-14 02:14:08'),
(7, 'Nintendo Joycons', 'Nintendo additional controllers', '59', 2, '2019-11-13 01:18:36', '2019-11-14 02:18:31'),
(8, 'Turtle Beach Headphones', 'Gaming headphones with microphone!', '150', 2, '2019-11-13 17:10:01', '2019-11-14 18:09:51'),
(9, 'Pacman', 'The classic game, remastered.', '49', 3, '2019-11-13 17:11:04', '2019-11-14 18:10:54'),
(10, 'Need For Speed', 'A Fast and Furious title.', '49', 3, '2019-11-13 17:12:21', '2019-11-14 18:12:11'),
(11, 'Legend of Zelda', 'Another classic release from Nintendo', '49', 3, '2019-11-13 17:12:59', '2019-11-14 18:12:49'),
(12, 'Call of Duty', 'Another year, another Call of Duty', '59', 3, '2019-11-13 19:07:34', '2019-11-14 20:07:34'),
(13, 'Tetris', 'The original video game', '29', 3, '2019-11-13 21:12:03', '2019-11-14 22:12:03'),
(14, 'Rocket League', 'The greatest soccer game around', '19', 3, '2019-11-13 00:52:54', '2019-11-14 01:52:54'),
(15, 'LG 4K TV', 'A quality TV with modern resolutions', '899', 4, '2019-11-13 06:47:08', '2019-11-14 05:47:08'),
(16, 'Samsung QLED TV', 'A flagship product with outstanding colors.', '1999', 4, '2019-11-13 06:36:37', '2019-11-14 05:36:37'),
(17, 'Gaming Monitor', 'A basic gaming monitor for your PC.', '199', 4, '2019-11-13 15:46:02', '2019-11-14 14:46:02');
