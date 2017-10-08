CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER (10) NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

insert into products (product_name, department_name, price, stock_quantity) values ("Dog Crunchies", "Food", 25, 100);

SELECT * FROM products;

insert into products (product_name, department_name, price, stock_quantity) values ("Chewey Snacks", "Food", 5, 25);


insert into products (product_name, department_name, price, stock_quantity) values ("Squeaky Toy", "Toys", 7, 75);

insert into products (product_name, department_name, price, stock_quantity) values ("Tennis Ball", "Toys", 3, 100);

insert into products (product_name, department_name, price, stock_quantity) values ("Crinkley Bear", "Toys", 10, 15);

insert into products (product_name, department_name, price, stock_quantity) values ("Leash", "Accessories", 5, 25);

insert into products (product_name, department_name, price, stock_quantity) values ("Collar", "Accessories", 2, 30);

insert into products (product_name, department_name, price, stock_quantity) values ("Harness", "Accessories", 4, 17);

insert into products (product_name, department_name, price, stock_quantity) values ("Flea Medicine", "Wellness", 20, 10);

insert into products (product_name, department_name, price, stock_quantity) values ("Doggie Shampoo", "Wellness", 7, 35);