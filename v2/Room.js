var tg = tg || {}; 

tg.Room = (function() {
	'use strict';

	function Room(opts) {
		this.description = opts.description || 'Nothing to see here';
		this.lookAts = opts.lookAts || {};
		this.exits = {};
	}

	Room.prototype.addExit = function(exit, room) {
		this.exits[exit] = room;
	}

	Room.prototype.hasExit = function(exit) {
		return !!this.exits[exit];
	}

	Room.prototype.hasLookAt = function(lookAt) {
		return !!this.lookAts[lookAt];
	}

	Room.prototype.getLookAt = function(lookAt) {
		return this.lookAts[lookAt];
	}

	Room.prototype.exitNames = function() {
		return _.map(this.exits, function(value, key) { 
			return key; 
		});	
	};

	Room.prototype.getExit = function(exitName) {
		if (!this.exits[exitName]) {
			return null;
		}

		return this.exits[exitName];
	}

	return Room;
})();
