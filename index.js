let express = require('express')
let fs = require('fs');
let http = require('http');
let https = require('https');
let bodyParser = require('body-parser')
let app = express()
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(request, response, next) {
  if (process.env.DEV === 'false' && !request.secure) {
    return response.redirect("https://" + request.headers.host + request.url);
  }
  next()
})

app.use('/', require('./routes/index'))
// app.use('/demo', require('./routes/demo'))

let httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log('[http] live!')
});

if(process.env.DEV === 'false') {

    let credentials = {
      "key": fs.readFileSync(process.env.PRIVATE_KEY, 'utf8'),
      "cert": fs.readFileSync(process.env.CERTIFICATE, 'utf8'),
      "ca": fs.readFileSync(process.env.CA, 'utf8')
    };
  
    let httpsServer = https.createServer(credentials, app);
    
    httpsServer.listen(443, () => {
      console.log('[https] live!')
    });
    
  }
