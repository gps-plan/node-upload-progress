(function() {
  var app, fs, uploadHandler, uploadProgress;

  app = require('http');

  fs = require('fs');

  uploadProgress = require('../lib/node-upload-progress');

  uploadHandler = new uploadProgress.UploadHandler;

  app.createServer(function(req, res) {
    if (req.url.match(/\/upload\?X\-Progress\-ID=.+/)) {
      return uploadHandler.upload(req, res);
    } else if (req.url.match(/\/progress\?X\-Progress\-ID=.+/)) {
      return uploadHandler.progress(req, res);
    } else {
      return fs.readFile("" + __dirname + "/index.html", function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data.toString());
        return res.end();
      });
    }
  }).listen(8080);

  console.log('Server running at http://localhost:8080/');

}).call(this);
