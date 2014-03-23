var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.lookAt = function(input, print, currentRoom) {
	'use strict';

	if (currentRoom().hasLookAt(input(2))) {
		print(currentRoom().getLookAt(input(2)));
	} else {
		print('You can\'t see no ' + input(2) + ' here');
	}
};
