DROP DATABASE IF EXISTS digital_sound;
CREATE DATABASE digital_sound;
USE digital_sound;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_first_name` varchar(100) NOT NULL,
    `user_last_name` varchar(100) NOT NULL,
    `user_email` varchar(100) NOT NULL,
    `user_password` varchar(100) NOT NULL,
    `user_image` varchar(100),
    `user_type` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
    -- KEY `users_user_type_id_foreign` (`user_type_id`)
    -- CONSTRAINT `user_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `profiles` (`id`)
    );
    
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_type_name` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
);
    
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `flag_is_open` bool NOT NULL,
    `cart_date_created` datetime NOT NULL,
    `cart_date_checkout` datetime,
    PRIMARY KEY (`id`),
    KEY `cart_user_id_foreign` (`user_id`)
);

DROP TABLE IF EXISTS `carts_products`;
CREATE TABLE `carts_products` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `product_id` int(10) NOT NULL,
    `cart_id` int(10) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `cart_product_product_id_foreign` (`product_id`),
	KEY `cart_product_cart_id_foreign` (`cart_id`)
);

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `product_name` varchar(100) NOT NULL,
    `product_description_short` varchar(400) NOT NULL,
    `product_description_long` varchar(400) NOT NULL,
    `product_price` decimal(11,2) NOT NULL,
    `product_images` varchar(400) NOT NULL,
    `flag_hot_product` bool,
    `flag_used_product` bool,
	`category_id` int(10) NOT NULL,
    `brand_id` int(10),
    `promotion_id` int(10),
    PRIMARY KEY (`id`),
    KEY `product_category_id_foreign` (`category_id`),
    KEY `product_brand_id_foreign` (`brand_id`),
    KEY `product_promotion_id_foreign` (`promotion_id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `category_name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `brand_name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `promotions`;
CREATE TABLE `promotions` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
    `promotion_name` varchar(50) NOT NULL,
    `promotion_discount_amount` decimal(3,2),
    PRIMARY KEY (`id`)
);
 




