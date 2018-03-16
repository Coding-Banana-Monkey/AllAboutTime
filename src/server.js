var http = require('http');
var fs = require('fs');
var path = require('path');
//var filePath = path.join(__dirname, '../static/html/clock.html');
//var  = require('./myStaticFilesHttpModule');

http.createServer(function(req, res) {
  var urlPath = req.url;
  var filePath;
  if (urlPath === '/') {
    filePath = './../static/html/clock.html';
  } else {
    var names = urlPath.split('.');
    var ext = names[names.length - 1];
    filePath = './../static/' + ext + urlPath;
  }
  var extname = path.extname(filePath);
  var contentType = 'text/html';

  switch (extname) {
     case '.js':
         contentType = 'text/javascript';
         break;
     case '.css':
         contentType = 'text/css';
         break;
     case '.json':
         contentType = 'application/json';
         break;
     case '.png':
         contentType = 'image/png';
         break;
     case '.jpg':
         contentType = 'image/jpg';
         break;
     case '.wav':
         contentType = 'audio/wav';
         break;
 }
  res.writeHead(200, {
          "Content-Type" : extname
      });

  fs.createReadStream(filePath).pipe(res);
  //res.write('Fuck U');
  // res.end('\nConnected...');
}).listen(8080);
