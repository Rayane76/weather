const express = require ("express")
const app = express()
const http= require('http');
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static("public"))


app.get("/",function(req,res){

const apiKey = "8ee0517a550ea2413da0d257cb18a3b7"
const url = "http://api.ipstack.com/check?access_key=" + apiKey + "&format=1"
http.get(url,function(response){
     response.on("data",function(data){
       const locationData = JSON.parse(data)
       const city = locationData.city
       const key = "b983b8a0cb02b757bd1d9028ca83a552"
       const unity = "metric"
       const link = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ key +"&units=" + unity
       https.get(link,function(response){
       response.on("data",function(data){
         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         res.render("weather",{city : city , temperature : temp})
         // res.write("<h1>The temperature in " + city +" is :" + temp + " degrees</h1>")
         // res.write("<form action='/' method='post'><p>Enter the name of a city : <input type='text' name='search'></p><button type='submit' name='button'>Submit</button></form>")
         // res.send()
       })
     })
     })
})
})

app.post("/",function(req,res){
  const city = req.body.search
  const apiKey = "b983b8a0cb02b757bd1d9028ca83a552"
  const unity = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units=" + unity
  https.get(url,function(response){
       response.on("data",function(data){
         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         res.render("weather",{city : city , temperature : temp})
        //  res.write("<h1>The temperature in " + city +" is :" + temp + " degrees</h1>")
        //  res.send()
})
})
})












app.listen("3000")
