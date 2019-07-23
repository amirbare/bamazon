DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,


  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bannas", "produce", 1.90, 10), ("apples", "produce", 2.90, 10), ("oranges", "produce", 1.00, 10),
("blueberry", "lettuce", 4.90, 10),("onions", "produce", .90, 10),("potatos", "produce", 1.30, 10),
("zuchuni", "produce", 1.40, 10),("tomatos", "produce", 1.80, 10),("garlic", "produce", 1.10, 10), ("strawberry", "produce", 3.90, 10);

SELECT * FROM products;
