var http = require('http');

http.createServer(function(req, res) {
  res.write('Fuck U');
  res.end('\nDone');
}).listen(8080);
