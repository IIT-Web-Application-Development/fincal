//Loads the nav bar in the pages.
$('#navbar').load('navbar.html');

/*Tip Calc Stuff*/
var bill = 0;
var splitTotal = 1;
var tipPercent = 10;
var totalTip;
var withoutTip;
var withTip;
var perPersonTip;

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

    totalTip = bill * tipPercent / 100; /*calc totaltip*/

    /*Update the html with the calculated value doe Total Tip Amount*/
    document.getElementById("total-tip").innerHTML = `$ ${parseFloat(
        totalTip
      ).toFixed(2)}`;

    withoutTip = bill / splitTotal; /*Get total split without tip included*/
    document.getElementById("total-without-tip").innerHTML = `$ ${parseFloat(
        withoutTip /*update html */
    ).toFixed(2)}`;


    perPersonTip = totalTip / splitTotal;/*Get the per person tip*/
    document.getElementById("total-tip-per-person").innerHTML = `$ ${parseFloat(
      perPersonTip
    ).toFixed(2)}`;


    withTip = perPersonTip + withoutTip; /*calc total with tip included*/
    document.getElementById("total-with-tip").innerHTML = `$ ${parseFloat(
      withTip
    ).toFixed(2)}`;

}

document.getElementById("add-people").addEventListener("click", function() {
    if (splitTotal < 99) {/*set range between 1-99*/
      splitTotal++; /*increase splitTotal var*/
    } else {
      splitTotal = 1;
    }
    calculate();
  });
  document.getElementById("minus-people").addEventListener("click", function() {
    if (splitTotal > 1) {/*set range between 1-99*/
      splitTotal--;/*decrease splitTotal var*/
    } else {
      splitTotal = 99;
    }
    calculate();
  });
  document.getElementById("add-percent").addEventListener("click", function() {
    if (tipPercent < 100) {/*set range between 1-100*/
      tipPercent++;/*increase splitTotal var*/
    } else {
      tipPercent = 0;
    }
    calculate();
  });
  document.getElementById("minus-percent").addEventListener("click", function() {
    if (tipPercent > 0) {/*set range between 1-100*/
      tipPercent--;/*decrease splitTotal var*/
    } else {
      tipPercent = 100;
    }
    calculate();
  });


calculate();

/*END OF TIP CALC STUFF*/