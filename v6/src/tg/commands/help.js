var tg = tg || {}; tg.commands = tg.commands || {};


tg.commands.help = (function(commands) {

  var help = function help(input, print, currentRoom) {
    'use strict';

    var msg = '<strong class="row">Available commands:</strong>';

    _.forIn(tg.commands, function (command, name) {
      if (!command.dontShowInHelp) {
        var helpDesc = command.help;
        var syntax = command.syntax || name;
        msg += '<div class="row"><div class="col-3">' + syntax + '</div>' + (helpDesc ? '<div class="col-7">' + helpDesc + '</div>': '') + "</div>";
      }
    });

    print(msg);
  };

  help.matches = function(input, currentRoom) {
    return input(0) === 'help';
  };

  help.help = 'This help';

  return help;

})(tg.commands);
