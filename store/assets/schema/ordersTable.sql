CREATE TABLE `orders` (
  `id` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `created` datetime NOT NULL,
  `users_id` int(4) NOT NULL,
  `fulfilled` int (1) NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orderdetails` (
  `id` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orders_id` int(4) NOT NULL,
  `products_id` int(4) NOT NULL,
  `quantity` int(4) NOT NULL,
  `price` decimal (10.0) NOT NULL,
  `description` text NOT NULL,
  FOREIGN KEY (orders_id) REFERENCES orders(id),
  FOREIGN KEY (products_id) REFERENCES products(id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
