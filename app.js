const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
var city="";
var temp;
var desp;
var img;
var mintemp;
var maxtemp;
var humidity;

var imgurl="http://openweathermap.org/img/wn/"+img+"@2x.png";
app.get("/",function(req,res){
  res.sendFile(__dirname+"/abc.html");
})
app.get("/weather",function(req,res){
res.render("Weather",{
  maxtemp: maxtemp,
  mintemp: mintemp,
  cityname: city,
  temp: temp,
  desp: desp,
  url: imgurl,
  humidity: humidity

})
})
app.get("/about.html",function(req,res){
  res.sendFile(__dirname+"/about.html");
});
app.post("/",function(req,res){
  city=req.body.cityName;
console.log("hello world");
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e13e33a8bcd210e4a36327d6654d2cf1&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode===200){
    response.on("data",function(data){
     var weatherdata=JSON.parse(data);
     temp=weatherdata.main.temp
     desp=weatherdata.weather[0].description
     img=weatherdata.weather[0].icon
     mintemp=weatherdata.main.temp_min;
     maxtemp=weatherdata.main.temp_max;
     humidity=weatherdata.main.humidity;
     imgurl="http://openweathermap.org/img/wn/"+img+"@2x.png"
    // res.write("<p> The Maximum temperature is "+maxtemp +" and the Minimum temperature is "+mintemp+"<p>");
    //      res.write("<h1>The temperature in "+city +"  is "+temp+"</h1>");
    //      res.write("<p> The weather is like "+desp +"<p>");
    //       res.write("<img src="+imgurl+">");
    //       res.write("<p> The humdity in the city is "+ humidity+"</p>")
    //       res.send();
    res.redirect("/weather");
    });
  }else{
    res.redirect("/");
  }
  });
})
app.post("/about",function(req,res){
  res.redirect("/");
})








app.listen(process.env.PORT|| 3000,function(){
  console.log("chal rha hai bc");
});
