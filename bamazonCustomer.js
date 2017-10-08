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
    });
}
displayItems();