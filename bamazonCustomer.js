var inquire = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection(
{
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) 
{
  if (err) throw err;
});

console.log("Welcome to Bamazon!\nPlease shop our wares...\n--------------------\n")
shop();

function shop()
{
  inquire.prompt([
    {
      name: "shop",
      message: "Would you like to shop?",
      type: "confirm"
    }
  ]).then(function(answer)
  {
    if(answer.shop == true)
    {
      displayProducts();
    } else 
    {
      connection.end();
    }
  })
}

function displayProducts()
{
  connection.query("SELECT product_name, item_id FROM products", function(err, res)
  {
    if(err) throw err;
    console.log("\n--------------------\n")
    for(var i = 0; i < res.length; i++)
    {
      console.log("Product: " + res[i].product_name + "\nItem Number: " + res[i].item_id + "\n")
    }
    console.log("\n--------------------\n")
    makePurchase();
  })
}

function makePurchase()
{
  inquire.prompt([
    {
      name: "product_selection",
      message: "What product would you like? (Enter in an Item Number): "
    },
    {
      name: "quantity",
      message: "Quantity: ",
      validate: function(input)
      {
        return !isNaN(input)
      }
    }
  ]).then(function(answer)
    {
      checkStock(answer.product_selection, answer.quantity);
    })
}

function checkStock(id, qty)
{
  connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id: id}, function(err, res)
  {
    if(qty <= res[0].stock_quantity)
    {
      var newQty = res[0].stock_quantity - qty;
      processOrder(id, qty, newQty)
    } else
    {
      console.log("Sorry, we don't have enough stock to fulfill that order.\nPlease change the quantity and try again.\n--------------------\n")
      shop();
    }
  })
}

function processOrder(id, qty, newQty)
{
  connection.query("SELECT price FROM products WHERE ?", {item_id: id}, function(err, res)
  {
    var total = res[0].price * qty
    console.log("Your total price is $" + roundCurrency(total))
    console.log("\nThank you for ordering!")
    shop();
  })
  connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQty}, {item_id: id}], function(err, res)
  {
    console.log(err)
  })
}

function roundCurrency(amount)
{
    var x = amount * 100
    x = Math.round(x)
    x = x/100
    return x
}


