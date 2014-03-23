describe("CommandParser", function() {

  var lastOutput,
      outputContains = function(str) {
        expect(lastOutput.indexOf(str) !== -1).toBeTruthy();
      },
      printFn = function(msg) { 
        lastOutput = msg;
      },
      currentRoom,
      currentRoomFn = function(nextRoom) {
        if (arguments.length > 0) {
          currentRoom = nextRoom;
        }
        return currentRoom;
      },
      commandParser,
      parseCommand = function(str) {
        return commandParser.parse(str);
      },
      currentRoom = room = new tg.Room({ 
        description: function() {
          if (this.actionExecuted) {
            return 'action executed';
          }

          return 'foo';
        },
        actions: {
          'execute': function(input, print) {
            if ('action' === input(1)) {
              this.actionExecuted = true;
              print('You execute the action!');
              return true;
            }

            return false;
          }
        } 
      });

  room.addExit("north", new tg.Room({ description: "room2" }));
  
  beforeEach(function () {
    lastOutput = null;
    currentRoom = room;
    commandParser = new tg.CommandParser(printFn, currentRoomFn);
  });

  it("should look", function() {
    parseCommand("look")();
    outputContains("foo");
  });

  it("should look at", function() {
    parseCommand("look at stuff")();
    outputContains("see no stuff");
  });

  it("should move north", function() {
    parseCommand("north")();
    outputContains("room2");
  });

  it("should parse unknown command", function() {
    parseCommand("oogie boogie boo")();
    outputContains("command:")
  });

  it("should ignore unnecessary white space and mixed cases", function() {
    parseCommand(" loOk   At   sTUFf  ")();
    outputContains("see no stuff");
  });

  it("should not execute action", function() {
    parseCommand("execute stuff")();
    outputContains("Unknown");
  });

  it("should execute action", function() {
    parseCommand("execute action")();
    outputContains("You execute");
  });

});
