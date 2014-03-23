
(function(Room, CommandParser, createWorld) {
	'use strict';

	var $terminalEl = $('.terminal-window');
	var $inputEl = $('.command-input');

	var print = function print(msg) {
		var $msg = $('<div class="msg">' + msg + '</msg>');	
		$terminalEl.append($msg);
		$msg[0].scrollIntoView();
	};

	var _currentRoom = createWorld();

	var currentRoom = function(nextRoom) {
		if (!nextRoom) {
			return _currentRoom;
		} else {
			_currentRoom = nextRoom;
		}
	};

	var commandParser = new CommandParser(print, currentRoom);

	$inputEl.focus();
	$inputEl.val('look');
	$inputEl.keypress(function(e) {
		if (e.keyCode !== 13) {
			return true;
		}

		var unparsedInput = $inputEl.val();
		var command = commandParser.parse(unparsedInput);

		command();
		
		$inputEl.val('');
		return false;
	});
	
})(tg.Room, tg.CommandParser, tg.createWorld);
