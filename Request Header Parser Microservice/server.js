const express = require('express');
const app = express();
const path = require('path');


app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'views/index.html')));

app.get('/whoami', (req, res, next) => {

  const ip = req.headers['x-forwarded-for'].split(',')[0];

  res.json({
    ipaddress: ip,
    language: req.headers['accept-language'].split(',')[0],
    software: req.headers['user-agent'].split(') ')[0].split(' (')[1]
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Contact from intelligent life received on port ${port}");
});
   

