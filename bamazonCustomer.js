var inquire = require("inquirer");
var database = require("mysql");

// install mySQL workbench on your home computer. Double check machine ready instructions to ensure there isn't anything special you missed.
// once installed create the database and tables as instructed. Use the below schema.


DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
