var http = require('http');
var fs = require('fs');
//var filePath = path.join(__dirname, '../static/html/clock.html');
var router = require('./myStaticFilesRouter');
var path = '../static/html/clock.html';

http.createServer(function(req, res) {
  var file = router(path, req);
  res.writeHead(200, {
          "Content-Type" : file.extname
      });

  fs.createReadStream(file.filePath)
  .on('error', function(err) {
    console.error(err);
    this.emit("end");
  })
  .pipe(res);
  //res.write('Fuck U');
  // res.end('\nConnected...');
}).listen(8080);
