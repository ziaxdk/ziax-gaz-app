var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(__dirname + "/build/www"));



// app.use(express.cookieParser());
// app.use(express.urlencoded());
// app.use(express.json());
// app.use(express.session({ secret: 'keyboard like ziax dash', key: 'm.ziax.dk' }));
// app.use(express.static(__dirname + "/www"));
// app.set('base', '/www');

app.get('/test', function(req, res) {
  res.send('ok213');
});


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  console.log("configure development");
}
else if ('production' == env) {
  console.log("configure production");
}

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});


// bower install ionic#1.0.0-beta.4