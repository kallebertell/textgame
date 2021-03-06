var tg = tg || {};

tg.CommandParser = (function() {
	function CommandParser(print, currentRoom) {
		this.print = print;
		this.currentRoom = currentRoom;
	}

	function preParse(str) {
		var tokens = _.map(str.split(' '), function(token) {
			return token.trim().toLowerCase();
		});

		tokens = _.filter(tokens, function(token) {
			return token.length > 0;
		});

		return function(from, to) {
			if (arguments.length < 1) {
				return tokens.join(' ');
			}

			if (to) {
				return tokens.slice(from, to+1).join(' ');
			}

			return tokens[from];
		};
	}


	CommandParser.prototype.parse = function parse(unparsedInput) {
		var self = this;

		var input = preParse(unparsedInput);

		var cmdLook = function() {
			var exits = self.currentRoom().exitNames();


			var msg = 
				'<div class="desc">' + self.currentRoom().description()+ '<div>' + 
				'<div>Exits: <span class="exits">' + (exits.length < 1 ? 'No obvious exits' : exits.join(', ')) + '</span></div>';
			self.print(msg);	
		};

		var cmdUnknown = function() {
			self.print('Unknown command: ' + unparsedInput);
		};

		if (input(0,1) === 'look at') {
			return function() {
				if (self.currentRoom().hasLookAt(input(2))) {
					self.print(self.currentRoom().getLookAt(input(2)));
				} else {
					self.print('You can\'t see no ' + input(2) + ' here');
				}
			};
		}

		if (input(0) === 'look') {
			return cmdLook;
		}	

		if (self.currentRoom().getExit(input(0)) !== null) {
			return function() {
				self.print('You walk into the "' + input(0) + '" exit');
				var nextRoom = self.currentRoom().getExit(input(0));
				self.currentRoom(nextRoom);
				cmdLook();
			};
		}

		if (self.currentRoom().hasAction(input(0))) {

			return function() {
				var action = self.currentRoom().getAction(input(0));

				if (!action(input, self.print, self.currentRoom)) {
					cmdUnknown();
				}
			};
		}

		return cmdUnknown;
	}

	return CommandParser;
})();
