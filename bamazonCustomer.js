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

var userquantity;
var userid; 

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
        userquantity = answers.count;
        userid = answers.id-1;
        productUpdate();
 
      });

    //   connection.end();

  }



  function productUpdate() {
    connection.query("SELECT * FROM products", function (err2, res2) {

        if (err2) throw err2;
        // console.log(res);
        // connection.end();
 
        for( var i= 0; i< res2.length; i++)
        {
            var  newid2 = (res2[i].item_id);

            var  newname2 = (res2[i].product_name);
            var  newprice2 = (res2[i].price);
            var  newquantity2 = (res2[i].stock_quantity);



        
        }

        if(userquantity > res2[userid].stock_quantity)
        {

            console.log("Insuffient quantity");
        }

        else
        {
            // console.log(userquantity);
            userid2 = userid+1;
            var quantityLeft = res2[userid].stock_quantity - userquantity;
            console.log(quantityLeft);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                  stock_quantity: quantityLeft
                  },
                  {
                    item_id: userid2
                  }
                ],
                function(error) {
                  if (error) throw err;
                //  console.log("last item error");
                 
                }); 

            var cost = userquantity * res2[userid].price; 
              console.log("Now there are " + quantityLeft + " " + res2[userid].product_name+" left");
              console.log("The cost of your transaction is $"+cost); 

       


        }

        


        connection.end();
    });


  
}



 