var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reservation array
var reservations = [
    {
      routeName: "mike",
      name: "Mike",
      phoneNumber: "610-000-0000",
      howMany: 5,
      uniqueID: 1
    }
]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  app.get("/forms", function(req, res) {
    res.sendFile(path.join(__dirname, "forms.html"));
  });

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

  app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  // Displays reservations
  app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });
  
  app.get("/api/reservations/:reservation", function(req, res) {
    var chosen = req.params.reservations;
  
    console.log(chosen);
  
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
  
    return res.json(false);
  });

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newreservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newreservation);
  
    reservations.push(newreservation);
  
    res.json(newreservation);
  });

  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });