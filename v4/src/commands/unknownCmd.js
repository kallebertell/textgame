var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.unknownCmd = function(input, print, currentRoom) {
	'use strict';

	print('Unknown command: ' + input());
};
