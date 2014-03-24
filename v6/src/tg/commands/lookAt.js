var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.lookAt = (function() {

		var lookAt = function lookAt(input, print, currentRoom) {
			'use strict';

			if (currentRoom().hasLookAt(input(2))) {
				print(currentRoom().getLookAt(input(2)));
			} else {
				print('You can\'t see no ' + input(2) + ' here');
			}
		};

		lookAt.matches = function(input, currentRoom) {
			return input(0, 1) === 'look at';
		};

		lookAt.help = 'Look at an item in the room';
		lookAt.syntax = 'look at [item]';


	return lookAt;

})();
