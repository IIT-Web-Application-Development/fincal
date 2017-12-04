//Loads the nav bar in the pages.
$('#navbar').load('navbar.html');

/*Tip Calc Stuff*/
var bill;
var splitTotal;

document.getElementById("bill-total").addEventListener("keyup", function() {/*When user finished typing*/
    bill = document.getElementById("bill-total").value;/*Take in value*/
    calculate();
  });

function split() {/*get total number of people from UI*/
    document.getElementById("split-amount").innerHTML = splitTotal;      
}

function tip() {/*get tip percent form UI*/
    document.getElementById("percentage").innerHTML = `${tipPercent}%`;
}


function calculate() {/*Main function to calculate everything.*/
    split();
    tip();
}