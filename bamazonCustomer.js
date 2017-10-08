var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "soccer15",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw errr;
    console.log("connected as id:" + connection.threadId);
    connection.end();
});

function displayItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("Current Inventory Available: " + "\n");
        for (var i = 0; i < results.length; i++) {
            console.log("Product Id: " + results[i].item_id + " Product Name: " +
                results[i].product_name + " Price: " + results[i].price);
        }
        inquirer.prompt([{
                type: "input",
                message: "What is the ID of the item you would like to purchase?",
                name: "id",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many would you like to purchase?",
                name: "amount",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
    });
}
displayItems();