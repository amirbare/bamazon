var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
//   runSearch();
  afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;
        // console.log(res);
        // connection.end();
 
        for( var i= 0; i< res.length; i++)
        {
            var  newid = (res[i].item_id);

            var  newname = (res[i].product_name);
            var  newprice = (res[i].price);
            var  newquantity = (res[i].stock_quantity);


            console.log("ID #" +newid+ " Quantity:" +newquantity+ " Item:"+newname+"  Price: $"+newprice+" each");  

        
        }

        runSearch();


    });
  
}



function runSearch() {
    inquirer
      .prompt([
        {
          name: 'id',
          message: 'What is the ID of the product you would like to buy?',
          default: '1',
        },
        {
          name: 'count',
          message: 'How many units of the product would you like to buy?',
          default: '1',
        },
      ])
      .then(function(answers) {
        console.info('Answers:', answers.id);
        console.info('Answers:', answers.count);

        
      });

      connection.end();

  }

