const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.get ("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
  // res.send("Server started on port 3000.");
});

app.post("/", function(req, res){
  // console.log(req.body.cityName);
  const q = req.body.cityName;
  const key = "39bc8b3fb914efd589c260ada9c80b39";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid="+key+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      // const object = {
      //   name: "Harshitha T",
      //   city: "Chennai"
      // }
      // console.log(JSON.stringify(object));
      const temp = weatherdata.main.temp;
      const descrip = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temprature in"+q+" is "+temp+" degrees in C.</h1>");
      res.write("<br><h2>The weather currently is "+descrip+" </h2>");
      res.write("<img src="+ imageURL+">");
      res.send();
    });
  });
  // console.log("Post request recieved!");
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
