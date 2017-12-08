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



INSERT INTO bamazon (product_name, department_name, price, stock_quantity)
VALUES  ("spoon", "houseware", 1.49, 100),
        ("microwave", "houseware", 49.99, 10),
        ("blender", "houseware", 24.99, 30),
        ("hammer", "home improvement", 4.99, 20),
        ("circular saw", "home improvement", 79.99, 4),
        ("drill", "home improvement", 34.99, 25),
        ("tv", "electronics", 299.99, 3),
        ("surround sound system", "electronics", 49.99, 20),
        ("blue-ray player", "electronics", 64.99, 29),
        ("laptop", "electronics", 149.99, 15);


Notes:

SELECT CustomerName, City FROM Customers;

SELECT DISTINCT Country FROM Customers;

SELECT * FROM Customers
WHERE Country='Mexico';

/* AND OR & NOT statements */
SELECT * FROM Customers
WHERE Country='Germany' AND City='Berlin';

SELECT * FROM Customers
WHERE City='Berlin' OR City='München';

SELECT * FROM Customers
WHERE NOT Country='Germany';

SELECT * FROM Customers
WHERE Country='Germany' AND (City='Berlin' OR City='München');

SELECT * FROM Customers
WHERE NOT Country='Germany' AND NOT Country='USA';

/* AND OR & NOT statements */
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;  /* asc is ascending/ desc is descending. */

-- The following SQL statement selects all customers from the "Customers" table, sorted by the "Country" and the "CustomerName" column:
SELECT * FROM Customers
ORDER BY Country, CustomerName;

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

-- Note: Be careful when deleting records in a table! Notice the WHERE clause in the DELETE statement. 
-- The WHERE clause specifies which record(s) that should be deleted. If you omit the WHERE clause, all records in the table will be deleted!
DELETE FROM Customers
WHERE CustomerName='Alfreds Futterkiste';

-- The GROUP BY statement is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns.
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);

-- The following SQL statement lists the number of customers in each country, sorted high to low:
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
ORDER BY COUNT(CustomerID) DESC;


