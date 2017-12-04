//Loads the nav bar in the pages.
$('#navbar').load('navbar.html');

/*Tip Calc Stuff*/
var bill;
var splitTotal;

document.getElementById("bill-total").addEventListener("keyup", function() {/*When user finished typing*/
    bill = document.getElementById("bill-total").value;/*Take in value*/
    calculate();
  });

document.getElementById("split-amount").innerHTML = splitTotal;