var tg = tg || {};

tg.parse = (function(commands, buildInput) {

  return function parse(unparsedInput, print, currentRoom) {
		function applyArgs(input, commandFn) {
			return function() {
				return commandFn(input, print, currentRoom);
			};
		};

		var input = buildInput(unparsedInput);

		if (input(0,1) === 'look at') {
			return applyArgs(input, commands.lookAt);
		}

		if (input(0) === 'look') {
			return applyArgs(input, commands.look);
		}

		if (currentRoom().getExit(input(0)) !== null) {
			return applyArgs(input, commands.move);
		}

		if (currentRoom().hasAction(input(0))) {
			return applyArgs(input, commands.action);
		}

	  return applyArgs(input, commands.unknownCmd);
	};


})(tg.commands, tg.buildInput);
