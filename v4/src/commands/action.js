var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.action = function(input, print, currentRoom) {
	'use strict';

	var action = currentRoom().getAction(input(0));

	if (!action(input, print, currentRoom)) {
		tg.commands.unknownCmd(input, print, currentRoom);
	}

};
