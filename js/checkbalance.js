$(document).ready(function() {
  "use strict";
  $.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });
  var addbalance = function ($amountname, $amount, $id) {
    var newBalance  =   {"Balance" : {
      "amountname" : $amountname,
      "amount" : $amount,
    }};
    $.post("http://localhost:9000/users/"+ $id +"/accountbalance", JSON.stringify(newBalance) , function(req, res){
      var $output = $("<p>");
      $output.text("New Balance ID: " + req.id);
      $(".output").html($output);
    });
  }
  $("#addbalance button").on("click", function() {
    var $field1 = $(".addaname");
    var $field2 = $(".addmoney");
    var $field3 = $(".userid");
    var $amountname = $field1.val();
    var $amount = $field2.val();
    var $id = $field3.val();
    $field1.val("");
    $field2.val("");
    $field3.val("");
    addbalance($amountname, $amount, $id);
  });
  //GET REMINDER
  var searchbalance = function ($iduser, $idbal) {
    var $link="http://localhost:9000/users/" + $iduser + "/accountbalance/" + $idbal;
    $.get($link, function(data, status){
      var $output = $("<p>");
      $output.text("Amount name: " + data.amountname + " Amount: " + data.amount + " Created: " + data.created);
      $(".output").html($output);
    });
  }
  $("#searchbalance button").on("click", function() {
    var $field1 = $(".search");
    var $field2 = $(".searchbal");
    var $iduser = $field1.val();
    var $idbal = $field2.val();
    $field1.val("");
    $field2.val("");
    searchbalance($iduser, $idbal);
  });
  //SUBMIT BUTTONS TO TAKE IN INPUT
  $("#viewusers button").on("click", function() {
    viewusers();
  });

  //GET USERS
  var viewusers = function () {
    $.get("http://localhost:3000/users", function(data, status){
      var $output = $("<p>");
      $output.text(JSON.stringify(data));
      $(".output").html($output);
    });
  }
  $("#searchuser button").on("click", function() {
    var $field1 = $(".searchuser");
    var $id = $field1.val();
    $field1.val("");
    searchuser($id);
  });

    //GET USER ID
    var searchuser = function ($id) {
      var $link="http://localhost:9000/users/" + $id;
      $.get($link, function(data, status){
        var $output = $("<p>");
        $output.text("Username: " + data.name + " Email: " + data.email);
        $(".output").html($output);
      });
    }
  $("#adduser button").on("click", function() {
    var $field1 = $(".addname");
    var $field2 = $(".addemail");
    var $name = $field1.val();
    var $email = $field2.val();
    $field1.val("");
    $field2.val("");
    adduser($name, $email);
  });

    //POST USER
    var adduser = function ($name, $email) {
      var newUser =   {'user' : {
        "name" : $name,
        "email" : $email
      }};
      $.post("http://localhost:9000/users", JSON.stringify(newUser) , function(req, res){
        var $output = $("<p>");
        $output.text("New userID: " + req.id);
        $(".output").html($output);
  
      }, "json");
    }



  $("#deletebalance button").on("click", function() {
    var $field1 = $(".deluser");
    var $field2 = $(".delbal");
    var $iduser = $field1.val();
    var $idbal = $field2.val();
    $field1.val("");
    $field2.val("");
    deletebalance($iduser, $idbal);
  });

  $("#deleteuser button").on("click", function() {
    var $field1 = $(".deluserid");
    var $iduser = $field1.val();
    $field1.val("");
    deleteuser($iduser);
  });
  
  $("#deleteall button").on("click", function() {
    var $field1 = $(".delall");
    var $iduser = $field1.val();
    $field1.val("");
    deletebalances($iduser);
  });
});
  //DELETE SINGLE REMINDER
  var deletebalance = function ($iduser, $idbal) {
    var $link="http://localhost:9000/users/" + $iduser + "/accountbalance/" + $idbal;
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("Balance ID: " + $idbal + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //DELETE USER
  var deleteuser = function ($iduser) {
    var $link="http://localhost:9000/users/" + $iduser;
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("userId: " + $iduser + " has been deleted");
        $(".output").html($output);
      }
    });
  }
  //DELETE ALL USER REMINDERS
  var deletebalances = function ($iduser) {
    var $link="http://localhost:9000/users/" + $iduser + "/accountbalance";
    $.ajax({
      url: $link,
      type: 'DELETE',
      data: "{}",
      contentType: "json",
      success: function(req) {
        var $output = $("<p>");
        $output.text("All reminders have been deleted for userID: " + $iduser);
        $(".output").html($output);
      }
    });
  }
  var viewbalances = function ($id) {
    var $link="http://localhost:9000/users/" + $id + "/accountbalance";
    $.get($link, function(data, status){
      data.forEach(function (blah) {
        var $output = $("<li>");
        $output.html("Amountname: " + blah.amountname + " Amount: " + blah.amount + " Created: " + blah.created)
        $(".output").append($output);
      });
    });
  }

  $("#viewbalances button").on("click", function() {
    var $field1 = $(".viewbalance");
    var $id = $field1.val();
    $field1.val("");
    viewbalances($id);
  });
  var markplease = function ($id) {
    var $link="http://localhost:9000/users/" + $id + "/accountbalance";
    $.get($link, function(data, status){
      data.forEach(function (blah) {
        var $output = $("<li>");
        $output.html("Amountname: " + blah.amountname + " Amount: " + blah.amount + " Created: " + blah.created +
          "<div><p id='paid'>Unpaid</p><button id='Mark2' onclick='myfunction()'>Paid it</button></div>")
        $(".output").append($output);
      });
    });
  }
  function myfunction(){
     document.getElementById('paid').innerHTML = "Paid It";
  }

  $('#Mark1').on('click', function(){
    var $field1 = $('.markbalance');
    var $id = $field1.val();
    $field1.val("");
    markplease($id);
  })
  $(".clear").on("click", function() {
    $(".output").html("");
  });