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
    displayItems();
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
                message: "What is the Product Id of the item you would like to purchase?",
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
                name: "quantity",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.id }, function(error, results) {
                if (error) throw error;
                if (answer.quantity <= results[0].stock_quantity) {
                    console.log("Your product is in stock!" + "\n");

                    var updateQuery = "UPDATE products SET stock_quantity = " + (results[0].stock_quantity - answer.quantity) + " WHERE item_id = " + answer.id;
                    connection.query(updateQuery, function(error, results) {
                        if (error) throw error;
                        console.log("Your order has been placed!" + "\n");
                        var selectUpdated = "SELECT * FROM products WHERE ?";
                        connection.query(selectUpdated, { item_id: answer.id }, function(error, results) {
                            if (error) throw error;
                            console.log("Your total is $" + results[0].price * answer.quantity);
                            connection.end();
                        })
                    })
                } else {
                    console.log("There is not enough product in stock, there are only " + results[0].stock_quantity + " items, please make another selection" + "\n");
                 	connection.end();
                }

            })

        });

    })
}