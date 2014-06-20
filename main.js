// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var uuid = require('node-uuid');
var Store = require("jfs");
var db = new Store("data");

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(bodyParser.json({ type: 'application/json' }))

// Routing
app.get('/scene/:id', function(req, res) {
  db.get(req.param("id"), function(err, obj){
    if (err) throw err;
    res.send(obj);
  })
});

app.post('/scene/', function(req, res) {
  var id = uuid.v1();
  var newScene = {};
  db.save(id, newScene, function(err) {
    if (err) throw err;
    res.send(id);
  });
});

app.put('/scene/:id', function(req, res) {
  db.save(req.param("id"), req.body, function(err){
    // id is a unique ID
    res.send(req.body);
  });
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});