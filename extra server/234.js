const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//json parse
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//initialize server
app.listen(9000, function () {
    console.log('Account app listening on port 9000')
});

//testing server works
app.get('/', function (req, res) {
    console.log("Account App");
    res.end("Account App!")
});

//init users array
var users = [];

app.post('/users', function (req, res) {
    var id = {"id" : users.length + 1};//increments IDs in array by 1.
    var postUser = req.body;//take in info from body

    postUser.id = id.id;
    postUser.bals = [];//init array to hold reminders

    users.push(postUser);//succesful completion

    res.status(200);
    //Return succesful
    res.json(id);
});
//POST Account Balance
app.post('/users/:userId/accountbalance', function (req, res) {
    //take in user id from post
    var inID = req.params.userId;
    var location = inID - 1;//takes user ID and subtracts one for location in array
    var date = new Date();//take js date into variable
    
    //if user not found in users array
    if(!users[location]){
      res.status(404);
      res.json({"message" : "Users ID not found: " + inID});
    }
    else {
      var id = {"id" : users[location].bals.length + 1};
      var nBalance = req.body;

      nBalance.id = id.id;
      nBalance.Balance.created = date;
      users[location].bals.push(nBalance);

      res.status(200);
      res.json(id);
    }
});

app.get('/users/:userId', function (req, res) {
  var inID = req.params.userId;//take in params from GET
  var location = inID - 1;//ID minus 1 to find index of array

  if(!users[location]){//If location does not exist
    res.status(404);//not found
    res.json({"message" : "userId not found: " + inID});
  }
  else {
    res.status(200);
    res.json(users[location].user);
  }
});

//GET USER REMINDERS
app.get('/users/:userId/accountbalance', function (req, res) {
  var inID = req.params.userId;//Take in userId
  var uLocation = inID - 1; //find user location in the array

  if(!users[uLocation]){
    res.status(404);
    res.json({"message" : "userId not found: " + inID});
  }
  else {
    //find the location of the reminder based on the user location
    var bLocation = users[uLocation].bals.length - 1;
    var allBal = []; 
    users[uLocation].bals.forEach(function(ret) {
      allBal.push(ret.Balance)
    });

    res.status(200);//succesful
    res.json(allBal);
  }
});

//GET REMINDER BY ID
app.get('/users/:userId/accountbalance/:accountbalanceId', function (req, res) {
  var inID = req.params.userId;//take in userID
  var balID = req.params.accountbalanceId;//take in accountbalanceId
  //find location of user and reminder in array
  var uLocation = inID - 1;
  var bLocation = balID - 1;

  if(!users[uLocation].bals[bLocation]){//is not found
    res.status(404);
    res.json({"message" : "Your Balance is not found: " + balID});
  }
  else {
    res.status(200);//found
    res.json(users[uLocation].bals[bLocation].Balance);//output
  }
});

//DELETE USER
app.delete('/users/:userId', function (req, res) {
  var inID = req.params.userId;//take in ID from params
  var uLocation = inID - 1;//find user location in array

  if(!users[uLocation]){
    res.status(404);
    res.json({"message" : "userId not found: " + inID})
  }
  else {
    delete users[uLocation];//delete user
    res.send("204 No Content");
  }
});

//Delete all reminders from user
app.delete('/users/:userId/accountbalance', function (req, res) {
  var inID = req.params.userId;//input user id
  var uLocation = inID - 1; //find position in array

  if(!users[uLocation]){//if not found
    res.status(404)
    res.json({"message" : "userId not found: " + inID})
  }
  else {
    users[uLocation].bals = [ ];//empty the users "sub array"
    res.status(204);
    res.send("204 No Content");
  }
});

//DELETE SPECIFIC REMINDER
app.delete('/users/:userId/accountbalance/:accountbalanceId', function (req, res) {
  //Take in user id and reminder id from params
  var inID = req.params.userId;
  var balID = req.params.accountbalanceId;
  //find location in array
  var bLocation = balID - 1;
  var uLocation = inID - 1;

  if(!users[uLocation].bals[bLocation]){
    res.status(404);
    res.json({"message" : "accountbalanceId not found: " + balID})
  }
  else {
    delete users[uLocation].bals[bLocation];//delete specific array
    res.send("204 No Content");
  }
});