// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
var log=console.log.bind(console);
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/", function (req, res,next) {

  let d=new Date();
  res.json({ unix: Math.floor(d.getTime() / 1000), utc:d.toUTCString()});
  next();

});


// your first API endpoint... 
app.get("/api/:date", function (req, res,) {
  const data =req.params.date;
  log(data);
  let d;
  let isUnix;
  d=(data.includes('-')) ? new Date(data): new Date(parseInt(data)) ? isUnix=true:isUnix=false;
  
  
  if (isNaN(d)) {
    res.json({error: "Invalid Date"});
  }else{
    if (isUnix){
      log(data)
      res.json({ unix: parseInt(data), utc: new Date(parseInt(data)).toUTCString()});
    }else{
      res.json({ unix: Math.floor(d.getTime() / 1000), utc:d.toUTCString()});
    }
    
  }

  
});





// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
