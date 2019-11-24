CREATE TABLE `categories` (
  `id` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'Consoles', 'Video Game Consoles.', '2019-11-13 00:35:07', '2019-11-14 17:34:33'),
(2, 'Accessories', 'Accessories and peripherals for gaming.', '2019-11-13 00:35:07', '2019-11-14 17:34:33'),
(3, 'Games', 'Best selection of Video Games', '2019-11-13 00:35:07', '2019-11-14 17:34:54'),
(4, 'Televisions', 'Televisions and monitors for your gaming needs.', '2019-11-13 00:00:00', '2019-11-14 13:27:26');
