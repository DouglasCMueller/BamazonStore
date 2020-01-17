var inquirer = require('inquirer');
var clc = require("cli-color");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Identity&1",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

var displayProducts = function(){

	var query = "Select * FROM products";
	connection.query(query, function(err, res){
        if(err) throw err;
        console.log(clc.red(" Current Inventory at Bamazon"));
        console.log(" ----------------------------------");
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
			colWidths: [10,25,25,10,20]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
        customerPurchase();
	});
}
function customerPurchase() {
    inquirer.prompt([{
      type: "input",
      name: "itemId",
      message: "Please provide the Item ID of the product you wish to purchase.",
    },
    {
type:"input",
name: "unitPurchase",
message: "How many units would you like to purchase?"
    }
  
    ])
      .then(answers => {
          
          console.log(answers)
  
      });
  }


// connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//    console.log("Current Inventory at Bamazon\n"+
//    "-----------------------------------------\n"+
//    "Item Id | Product Name | Department Name | Price | Stock Quantity");

//     for (i=0;i<res.length; i++){
        
//     console.log(res[i].item_id + "        " + res[i].product_name + "       " + res[i].department_name + "        " +
//     + "        " + res[i].price + "        " + res[i].stock_quantity);
//     }
//     connection.end();
//   });
