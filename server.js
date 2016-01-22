var express = require('express'),
    cp = require("child_process"),
    app = express();

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
app.get('/ajax', function (req, res) {
  res.sendFile(__dirname + '/ajax.html');
});

app.get('/environment/configure', function(req, res){
    res.writeHead(200, { "Content-Type": "text/event-stream",
                         "Cache-control": "no-cache" });

    var spw = cp.spawn('ping', [ '-c', '25', '127.0.0.1' ]),

    // execFile = require('child_process').execFile,
    // child = execFile('./sample.sh', function(error, stdout, stderr) {
    //     if (error) {
    //         throw error;
    //     }
    //     console.log(stdout);
    // }),

    str = "";

    spw.stdout.on('data', function (data) {
        str += data.toString();

        // Output sh script STDOUT
        console.log(data.toString());

        // Flush out line by line.
        var lines = str.split("\n");
        for(var i in lines) {
            if(i == lines.length - 1) {
                str = lines[i];
            } else{
                // Note: The double-newline is *required*
                res.write('data: ' + lines[i] + "\n\n");
            }
        }
    });

    spw.on('close', function (code) {
        res.end(str);
    });

    spw.stderr.on('data', function (data) {
        res.end('stderr: ' + data);
    });
});

app.use(express.static('dist'));

var server = app.listen(3000, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
