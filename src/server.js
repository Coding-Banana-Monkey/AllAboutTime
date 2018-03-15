var http = require('http');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'html/clock.html');

http.createServer(function(req, res) {
  res.writeHead(200, {
          "Content-Type": "text/html"
      });

  fs.createReadStream(filePath).pipe(res);
  //res.write('Fuck U');
  // res.end('\nConnected...');
}).listen(8080);
