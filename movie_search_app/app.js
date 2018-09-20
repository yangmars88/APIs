var express=require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");

app.get("/resultsYahoo",function(req,res){
   
   request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error,response,body){
       if(!error&& response.statusCode==200){
           
           var parsedData=JSON.parse(body)["query"]["results"]["channel"]["astronomy"]["sunset"];
           //res.send(parsedData);
           res.render("results",{Data:parsedData}); 
       }
   });
    
});
  //below router doesn't work as OMDBAPI is not working anymore! but the code is fine.
app.get("/resultsOMDB",function(req, res){
     var querysearch=req.query.searchContent;
    var url="http://omdbapi.com/?s="+querysearch;
   request(url, function(error,response,body){
       if(!error&& response.statusCode==200){
           var parsedData=JSON.parse(body);
           //res.send(parsedData);
           res.render("results",{Data:parsedData}); 
       }
   });
    
});


app.get("/",function(req, res) {
    res.render("search");
});

app.listen(8080,process.env.IP,function(){
    console.log("Movie app has started!");
});