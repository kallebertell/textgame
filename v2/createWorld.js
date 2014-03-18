var tg = tg || {};

tg.createWorld = (function(Room) {
	return function() {
	
		var throneRoom = new Room({
			description: 'There is a great throne here!',
			lookAts: {
				'throne': 'That\'s a good looking throne'
			}
		});

		var corridor = new Room({
			description: 'You\'re in a long dark corridor. The floor is dark slate.',
			lookAts: {
				'floor': 'There seems to be a crack in the floor',
				'crack': 'Super interesting crack'
			},
		});

		throneRoom.addExit('south', corridor);
		corridor.addExit('north', throneRoom);

		return corridor;
	};
})(tg.Room);
