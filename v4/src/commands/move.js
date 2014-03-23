var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.move = function(input, print, currentRoom) {
	'use strict';

	print('You walk into the "' + input(0) + '" exit');
	var nextRoom = currentRoom().getExit(input(0));
	currentRoom(nextRoom);
	tg.commands.look(input, print, currentRoom);
};
