var path = require('path');
module.exports = function(filePath, req) {
  var urlPath = req.url;
  if (urlPath === '/') {
    filePath = './' + filePath;
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
  return {
    filePath : filePath,
    extname : extname
  }
}
