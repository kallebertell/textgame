var tg = tg || {};

tg.createWorld = (function(Room) {
	return function() {
	
		var start = new Room({
			description: 'You\'re in a weird looking place. Flowers grow here.',
			lookAts: {
				'flowers': 'Maybe you could smell these flowers'
			},
			actions: {
				'smell': function(input, print, currentRoom) {
					if (input(1) !== 'flowers') {
						print("Smell what?");
						return 1;
					}

					print("You smell the flowers and you are taken away to a memory of your childhood");
					currentRoom(childhood);
					return 1;
				}
			}
		});

		var childhood = new Room({
			description: 'This is your childhood. Cooky.',
			lookAts: {
				'childhoold': 'Seems happy'
			}
		});


		return start;
	};
})(tg.Room);
