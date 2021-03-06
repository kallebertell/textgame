var tg = tg || {}; 

tg.Room = (function() {
	'use strict';

	function Room(opts) {
		this._description = opts.description || 'Nothing to see here';
		this._lookAts = opts.lookAts || {};
		this._exits = {};
		this._actions = opts.actions || {};
	}

	Room.prototype.description = function() {
		return (_.isFunction(this._description) ? this._description() : this._description); 
	};

	Room.prototype.addExit = function(exit, room) {
		this._exits[exit] = room;
	};

	Room.prototype.hasExit = function(exit) {
		return !!this._exits[exit];
	};

	Room.prototype.hasLookAt = function(lookAt) {
		return !!this._lookAts[lookAt];
	};

	Room.prototype.getLookAt = function(lookAt) {
		var item = this._lookAts[lookAt];
		return (_.isFunction(item) ? item() : item);
	};

	Room.prototype.hasAction = function(action) {
		return !!this._actions[action];
	};

	Room.prototype.getAction = function(action) {
		return this._actions[action];
	}

	Room.prototype.exitNames = function() {
		return _.map(this._exits, function(value, key) { 
			return key; 
		});	
	};

	Room.prototype.getExit = function(exitName) {
		if (!this._exits[exitName]) {
			return null;
		}

		return this._exits[exitName];
	};

	return Room;
})();
