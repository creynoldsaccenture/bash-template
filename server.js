var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/commands/filesystem', function (req, res) {
  res.sendFile(__dirname + '/filesystem.html');
});
app.get('/commands/process', function (req, res) {
  res.sendFile(__dirname + '/process.html');
});
app.get('/commands/sublime', function (req, res) {
  res.sendFile(__dirname + '/sublime.html');
});

app.use(express.static('dist'));

var server = app.listen(3000, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
