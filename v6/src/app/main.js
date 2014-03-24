var app = app || {};

app.main = (function(Room, parse, currentRoom, createWorld) {
	'use strict';

	return function() {
		var $terminalEl = $('.terminal-window');
		var $inputEl = $('.command-input');

		var print = function print(msg) {
			var $msg = $('<div class="msg">' + msg + '</msg>');
			$terminalEl.append($msg);
			$msg[0].scrollIntoView();
		};

		currentRoom(createWorld().get('westfield'));

		var parseInputAndExecute = function(unparsedInput) {
			var command = parse(unparsedInput, print, currentRoom);
			command();
		};

		$inputEl.keypress(function(e) {
			if (e.keyCode !== 13) {
				return true;
			}

			parseInputAndExecute($inputEl.val());
			$inputEl.val('');
		});

		parseInputAndExecute('help');
		parseInputAndExecute('look');
		$inputEl.focus();
	};

})(tg.Room, tg.parse, tg.currentRoom, app.createWorld);
