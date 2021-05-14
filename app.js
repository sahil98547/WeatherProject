const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    const query = req.body.Cityname;
    const apikey = "29442cfcc9a46583b5583c0ff6c3ee7f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weather = JSON.parse(data);
            const icon = weather.weather[0].icon;
            const temp = weather.main.temp;
            const weatherDescription = weather.weather[0].description;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The weather of " + query + " is " + temp + " degree celcius</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        });

    });
});





app.listen(3000, function() {
    console.log("Server is running on port number 3000.");
});