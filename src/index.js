/* Source: https://github.com/rithmschool/node_curriculum_examples/tree/master/socket_io */

/* node index.js to run */
/* ngrok http 8000 to tunnel *//*

var express = require("express"),
app = express();
app.use(express.static(__dirname + '/public'))
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    /* Handling CORS: https://socket.io/docs/v3/handling-cors/ for ngrok.io 
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', function(socket){
  socket.on('join', function(name){
    
    socket.username = name
    io.sockets.emit("addChatter", name);
  });

  socket.on('messages', function(message){
    username = socket.username
    io.sockets.emit("messages", {username, message});
  });

});
*/