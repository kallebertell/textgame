var tg = tg || {};

tg.parse = (function(commands, buildInput) {

  return function parse(unparsedInput, print, currentRoom) {
		var input = buildInput(unparsedInput);

    var bestFit = commands.unknownCmd;

    _.forIn(commands, function (command, name) {
        if (command.matches && command.matches(input, currentRoom)) {
          bestFit = command;
        }
    });

    return function() {
      return bestFit(input, print, currentRoom);
    };
	};


})(tg.commands, tg.buildInput);
