const express = require('express');
const app = express();
const path = require('path');


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'pug');
app.get('/', (req, res, next) => {

  const temp_ip = req.headers['x-forwarded-for'].split(',')[0];
    const temp_language= req.headers['accept-language'].split(',')[0];
    const temp_software= req.headers['user-agent'].split(') ')[0].split(' (')[1];
  res.render(path.join(__dirname, 'index.jade'),{ip:temp_ip,lang:temp_language,os:temp_software});
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Contact from intelligent life received on port ${port}");
});
   

