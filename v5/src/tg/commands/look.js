var tg = tg || {}; tg.commands = tg.commands || {};

tg.commands.look = (function() {
	'use strict';

  var look = function(input, print, currentRoom) {
		var exits = currentRoom().exitNames();
		var msg =
			'<div class="desc">' + currentRoom().description()+ '<div>' +
			'<div>Exits: <span class="exits">' + (exits.length < 1 ? 'No obvious exits' : exits.join(', ')) + '</span></div>';
		print(msg);
	}

	look.matches = function(input, currentRoom) {
			return input(0) === 'look';
	};

	look.help = 'Show what\'s in the current room';

	return look;
})();
