var path = require('path');
var  extname = 'html';
module.exports = function(filePath, req) {
  var urlPath = req.url;
  if (urlPath === '/') {
    filePath = './' + filePath;
  } else {
    var names = urlPath.split('.');
    extname = names[names.length - 1];
    //console.log(extname);
    filePath = './../static' + urlPath;
  }

  var contentType = 'text/html';

  switch (extname) {
     case 'js':
         contentType = 'text/javascript';
         break;
     case 'css':
         contentType = 'text/css';
         break;
     case 'json':
         contentType = 'application/json';
         break;
     case 'png':
         contentType = 'image/png';
         break;
     case 'jpg':
         contentType = 'image/jpg';
         break;
     case 'wav':
         contentType = 'audio/wav';
         break;
  }
  return {
    filePath : filePath,
    extname : contentType
  }
}
