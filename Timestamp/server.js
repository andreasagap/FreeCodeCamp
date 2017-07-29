// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:id', function(req,res) {
	var param = req.params.id;
	var id;
	if(isNaN(param)) {
		id = new Date(param);
	} else {
		id = new Date(parseInt(param)*1000);
	}

	var theDate, theUnix, dateString;
	var monthNames = ["January", "February", "March", 
                  	  "April", "May", "June","July", 
                  	  "August", "September", "October", 
                  	  "November", "December"
					  ];

	if ( Object.prototype.toString.call(id) === "[object Date]" ) {
    // it is a date
	  	if ( !isNaN( id.getTime() ) ) { 
	      //good date
	  	  theUnix = id.getTime()/1000;
	  	  theDate = monthNames[id.getMonth()] + " " + id.getDate() + ", " + id.getFullYear();
	  	
	  	} else {
  	    // invalid date
  	    theDate = null;
	      theUnix = null;
	    }
	} else {
  	  // not a date
  	theDate = null;
	  theUnix = null;
	}
dateString = {"unix":theUnix, "natural" : theDate};
		res.json(dateString)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
