var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.action = (function(commands) {
	'use strict';

	var action = function action(input, print, currentRoom) {
		var roomAction = currentRoom().getAction(input(0));

		if (!roomAction(input, print, currentRoom)) {
			commands.unknownCmd(input, print, currentRoom);
		}
	};

	action.matches = function(input, currentRoom) {
		return currentRoom().hasAction(input(0));
	};

	action.dontShowInHelp = true;

	return action;
})(tg.commands);
