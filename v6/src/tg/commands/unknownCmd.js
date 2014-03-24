var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.unknownCmd = function(input, print, currentRoom) {
	'use strict';

	print('Unknown command: "' + input() + '". Use "help" to see available commands.');
};

tg.commands.unknownCmd.dontShowInHelp = true;
