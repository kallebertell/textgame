var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.look = function(input, print, currentRoom) {
	'use strict';

	var exits = currentRoom().exitNames();
	var msg =
		'<div class="desc">' + currentRoom().description()+ '<div>' +
		'<div>Exits: <span class="exits">' + (exits.length < 1 ? 'No obvious exits' : exits.join(', ')) + '</span></div>';
	print(msg);
};
