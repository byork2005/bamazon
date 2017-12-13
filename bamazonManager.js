var inquire = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var holder = [];
var tempQty;

var table = new Table(
    {
        head: ["Item Id","Product Name","Department","Price","Stock Qty"],
        colWidths: ["50","100","100","50","72"]
    }
)

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

function options()
{
    inquire.prompt([
        {
            name: "choice",
            message: "What would you like to do?",
            type: "list",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ]).then(function(answer)
        {
            // add switch function to other operations
            console.log("you choose: " + answer.choice)
        })
}

function allProducts()
{
    connection.query("SELECT * FROM products", function(err, res)
    {
        for(var i = 0; i < res.length; i++)
        {
            console.log(res[i]);
        } 
    })
}

function lowInventory()
{
    connection.query("SELECT product_name FROM products WHERE stock_quanity < 5", function(err, res)
    {
        for(var i = 0; i < res.length; i++)
        {
            console.log(res[i]);
        } 
    })
}

addInventory();

function addInventory()
{
    connection.query("SELECT product_name FROM products", function(err, res)
    {
        for(var i = 0; i < res.length; i++)
        {
            holder.push(res[i].product_name);
        }
        inquire.prompt([
            {
                name: "add",
                message: "Which Product's Inventory needs increased?",
                type: "list",
                choices: holder           
            },
            {
                name: "qty",
                message: "How many units are being added?"
            }
        ]).then(function(answer)
            {
                connection.query("SELECT stock_quantity FROM products WHERE ?", {product_name: answer.add}, function(err, res)
                {
                    tempQty = res[0].stock_quantity;
                    tempQty += answer.qty;
                    console.log(err);
                })
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quanity: tempQty},{product_name: answer.add}] ,function(err, res)
                {
                    console.log(err);
                })
            })
    })
};