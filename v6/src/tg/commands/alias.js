var tg = tg || {}; tg.commands = tg.commands || {};


tg.commands.alias = (function(aliases) {

	var alias = function help(input, print, currentRoom) {
		'use strict';

		var msg = '<strong class="row">Available aliases:</strong>';

		_.forIn(tg.aliases, function (targetString, alias) {
				msg += '<div class="row"><div class="col-1 text-right">' + alias + ' = </div><div class="col-3">&nbsp;' + targetString + '</div></div>';
		});

		print(msg);
	};

	alias.matches = function(input, currentRoom) {
			return input(0) === 'alias';
	};

	alias.help = 'List available aliases. I.e. short-hand syntaxes for common commands.';

	return alias;

})(tg.aliases);
