(function(Room, createWorld, parse, currentRoom) {
	'use strict';

	var $terminalEl = $('.terminal-window');
	var $inputEl = $('.command-input');

	var print = function print(msg) {
		var $msg = $('<div class="msg">' + msg + '</msg>');
		$terminalEl.append($msg);
		$msg[0].scrollIntoView();
	};

	currentRoom(createWorld());

	$inputEl.focus();
	$inputEl.val('look');
	$inputEl.keypress(function(e) {
		if (e.keyCode !== 13) {
			return true;
		}

		var unparsedInput = $inputEl.val();
		var command = parse(unparsedInput, print, currentRoom);

		command();

		$inputEl.val('');
		return false;
	});

})(tg.Room, tg.createWorld, tg.parse, tg.currentRoom);
