import Ember from 'ember';

export default Ember.Controller.extend({

  isBogus:        false,
  numVotes:       0,
  numConnections: 0,
  isVoted:        Ember.computed.gt('numVotes', 0),

  actions: {
    sendVote: function() {
      this.socket.emit('sendVote', this.get('voteValue'));
      this.set('isBogus', false);
    },
    resetVotes: function() {
      this.socket.emit('resetVotes');
    },
  },

  getConnections: function(){
    this.socket.emit('getNumConnections');
  }.on('init'),

  sockets: {
    //cherryPickedName: ['name', 'age'],
    ////OR
    // cherryPickedName: function(name, age) {
    //   console.log('cherryPickedName', name, age);
    //   this.set('name', name);
    //   this.set('age', age);
    // },

    onGetNumConnections: function(n){
      this.set('numConnections', n);
    },

    onResetVotes: function() {
      this.set('isBogus', false);
    },

    onAverageVotes: function(averageVoteValue, numVotes) {
      this.set('averageVoteValue', averageVoteValue);
      this.set('numVotes', numVotes);
    },

    onBogusVote: function() {
      this.set('isBogus', true);
    },

    public: function(value) {
      console.log('public event:', value);
    },

    connect: function() {
      console.log('EmberSockets has connected...');
    },

    disconnect: function() {
      console.log('EmberSockets has disconnected...');
    }
  },
});
