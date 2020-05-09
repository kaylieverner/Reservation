var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
];
var waitlist = [
];

//routes to send user to pages 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(tables);
}); 

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist); 
}); 

app.get("/api/clear", function (req, res) {
    tables = [];
    waitlist = [];
}); 

// post
app.post("/api/tables", function (req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name
    // .replace(/\s+/g, "").toLowerCase();

    if (tables.length < 5) {
        tables.push(newReservation);
    } else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});

app.post("/api/waitlist", function (req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    if (tables.length < 5) {
        tables.push(newReservation);
    } else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});

app.post("/api/clear", function (req, res) {
   tables = [];
   waitlist = [];

    res.json();
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});