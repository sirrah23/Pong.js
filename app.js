var express = require('express');
var socket = require('socket.io');

var app = express();

var P1; // Player One
var P2; // Player Two
var guests = []; // People Watching


app.use(express.static('public'));

var server = app.listen(8080, function(){
  console.log("Listening on port 8080");
});

var io = socket(server);

io.sockets.on('connection', function(socket){
  if(!P1){
    P1 = socket;
    console.log("P1 is " + socket.id);
  } else if (!P2){
    P2 = socket;
    console.log("P2 is " + socket.id);
  } else {
    guests.push(socket);
    console.log("New guest " + socket.id);
  }
});
