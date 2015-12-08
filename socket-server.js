var io    = require('socket.io')(8888, { serveClient: false });
var math  = require('mathjs');
var _     = require('underscore');

//io.set('origins', '*localhost:4200 localhost:*');
io.set('origins', '*:*');

var numConnections  = 0;
var allVotes        = [];
var allVoterIds     = [];

io.on('connection', function(socket) {
  console.log('connection: ', socket.conn.id);
  numConnections ++;

  //io.emit('public', { will: 'be received by everyone'});
  /*
  socket.on('cherryPickName', function(name, age) {
    console.log("emitted")
    var names = ['Adam', 'Masha', 'Baki', 'Vaidas', 'Dhruv', 'Gabriele', 'Javier',
                 'Noemi', 'Dmitri', 'Simon', 'Artem', 'Raj', 'Mark', 'Mide'];

    socket.emit('cherryPickedName', names[0], Math.floor(Math.random() * 30) + 1);
  });
  */


  socket.on('sendVote', function(voteValue) {
    var a = 0;
    var i = parseInt(voteValue);
    
    if(!isNaN(i) && !_.contains(allVoterIds, socket.conn.id)){
      allVotes.push(i);
      allVoterIds.push(socket.conn.id);
    } else {
      socket.emit('onBogusVote');
      return;
    }
    
    if(allVotes.length > 0){
      a = math.mean(allVotes);
    }
    
    console.log(this.conn.id + " sent " + voteValue);
    io.emit('onAverageVotes', a, allVotes.length);
  });

  socket.on('resetVotes', function(){
    console.log('reset');
    allVoterIds.length = 0;
    allVotes.length = 0;
    io.emit('onResetVotes');
  });

  socket.on('getNumConnections', function(){
    io.emit('onGetNumConnections', numConnections);
  });

  socket.on('disconnect', function(){
    numConnections--;
  });

});

    