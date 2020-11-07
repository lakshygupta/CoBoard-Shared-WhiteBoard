const  express = require('express');
const app = express();
// const socket = require('socket.io');
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server)

const port = process.env.PORT || 3000;
//Starting a server
server.listen(port,()=> {
    console.log(`App is running at ${port}`);
})

app.use(express.static('public'));
// app.use(express.static(__dirname + '/../../build'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('server.js'));
  }

// const io = socket(server);
const users = {};
// var connectCounter = 0;
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
    socket.broadcast.emit('recieve',  io.sockets.server.engine.clientsCount);
    // socket.broadcast.emit('recieve',  connectCounter);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        socket.broadcast.emit('recieve',  io.sockets.server.engine.clientsCount);
        
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
        
      }
      );
      
      // socket.on('users', () => {
        //     socket.broadcast.emit('users', () => { console.log(io.sockets.server.engine.clientsCount); })
        // });
        
        // socket.on('connect', function() { connectCounter++; });
        
        socket.on('disconnect', function() {
          // connectCounter--;
          console.log("Client has disconnected");
          socket.broadcast.emit('left', users[socket.id]);
          delete users[socket.id];
        });
        
        
        socket.on('new-user-joined', name => {
          console.log("New User ", name);
          users[socket.id] = name;
          socket.broadcast.emit('user-joined', name);
        });

        socket.on('message', (evt) => {
          log(evt)
          socket.broadcast.emit('message', evt)
      })  

  }
);