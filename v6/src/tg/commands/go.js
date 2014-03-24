var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.go = (function() {
	'use strict';

	var go = function(input, print, currentRoom) {
		var exitName = input(0) === 'go' ? input(1) : input(0);

		print('You go into the "' + exitName + '" exit');
		var nextRoom = currentRoom().getExit(exitName);
		currentRoom(nextRoom);
		tg.commands.look(input, print, currentRoom);
	};

	go.matches = function(input, currentRoom) {
			return input(0) === 'go' || currentRoom().hasExit(input(0));
	};

	go.help = "Go into a new room.";
	go.syntax = "go [exit] | [exit]";

	return go;
})();
