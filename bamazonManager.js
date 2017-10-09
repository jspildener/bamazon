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
    if (err) throw err;
    managerAction();
});

function managerAction() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View products for sale",
                "View low inventory",
                "Restock inventory",
                "Add new product",
                "Exit inventory"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View products for sale":
                    displayItems();
                    break;
                case "View low inventory":
                    lowInventory();
                    break;
                case "Restock inventory":
                    addInventory();
                    break;
                case "Add new product":
                    addProduct();
                    break;
                case "Exit inventory":
                    exitApplication();
                    break;
            }
        });
}
function exitApplication() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to exit the inventory log, yes or no?",
        name: "yes"
    }]).then(function(answer) {
        if (answer.yes) {
            connection.end();
        } else {
            managerAction();
        }
    })
}
function displayItems() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("Current Inventory Available: " + "\n");
        for (var i = 0; i < results.length; i++) {
            console.log("Product Id: " + results[i].item_id + " Product Name: " +
                results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price +
                " Quantity in Stock: " + results[i].stock_quantity);
        }
        managerAction();
    })
}
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(error, results) {
        if (error) throw error;
        console.log("Current inventory below 5 units: " + "\n");
        for (var i = 0; i < results.length; i++) {
            console.log("Product Id: " + results[i].item_id + " Product Name: " +
                results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price +
                " Quantity in Stock: " + results[i].stock_quantity);
        }
        exitApplication();
    })
}
function addInventory() {
    inquirer.prompt([{
            type: "input",
            message: "What is the Product Id of the item you would like to restock?",
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
            message: "How many would you like to add?",
            name: "quantity",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
    ]).then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: answer.id }, function(error, results) {
            if (error) throw error;
            var updateQuery = "UPDATE products SET stock_quantity = " + (parseInt(results[0].stock_quantity) + parseInt(answer.quantity)) + " WHERE item_id = " + answer.id;
            connection.query(updateQuery, function(error, results) {
                if (error) throw error;
                console.log("Your inventory has been added!" + "\n");
                var selectUpdated = "SELECT * FROM products WHERE ?";
                connection.query(selectUpdated, { item_id: answer.id }, function(error, results) {
                    if (error) throw error;
                    console.log("Your current inventory is " + results[0].stock_quantity + " units of " + results[0].product_name + ".");
                    console.log("\n");
                    exitApplication();
                    //managerAction();
                })
            });
        })
    })
}
function addProduct() {
    inquirer.prompt([{
                type: "input",
                message: "What is the name of the product you would like to stock?",
                name: "name",
            },
            {
                type: "input",
                message: "What department does this product belong in?",
                name: "department",
            },
            {
                type: "input",
                message: "How much does this product cost?",
                name: "price",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many would you like to have in stock?",
                name: "quantity",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function(answer) {
            var query = "INSERT INTO products SET ?";
            connection.query(query, {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function(error, results) {
                    if (error) throw error;
                    console.log("New product added!");
                    exitApplication();
                })
        })
}