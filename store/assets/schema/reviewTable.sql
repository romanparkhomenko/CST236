CREATE TABLE `reviews` (
  `id` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `products_id` int(4) NOT NULL,
  `users_id` int(4) NOT NULL,
  `review` text NOT NULL,
  `stars` float (5.0) NOT NULL,
  `created` datetime NOT NULL,
  FOREIGN KEY (products_id) REFERENCES products(id),
  FOREIGN KEY (users_id) REFERENCES users(id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
