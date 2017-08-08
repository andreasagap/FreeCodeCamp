var express = require('express');
var multer  = require('multer');
var bodyParser = require('body-parser')
var path = require('path')

var upload = multer({dest:'./uploads/'})

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'pug');

app.get("/", function(req, res) {
  res.render('index.jade',{cfile:'Choose File'});
});

app.post("/form", upload.single('file'),function(req, res) {
  var obj = req.file.size
  if(obj>1024 && obj<1048576)
    obj=(obj/1024).toFixed(2)+" KB";
  else if(obj>1048576)
    obj=(obj/1048576).toFixed(2)+" MB";
  else
    obj=obj+" Bytes";
  res.render('index.jade',{response:obj});
});

app.listen(port, function () {
  console.log('Listening on port: ' + port);
});