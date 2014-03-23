describe("commands", function() {
  'use strict';

  var lastOutput,
      expectOutput = function(str) {
        expect(lastOutput).toContain(str);
      },
      expectNotInOutput = function(str) {
        expect(lastOutput).not.toContain(str);
      },
      printFn = function(msg) {
        lastOutput = msg;
      },
      parse = function(unparsedInput) {
        return tg.parse(unparsedInput, printFn, tg.currentRoom);
      },
      room1 = new tg.Room({
        description: function() {
          return 'foo';
        },
        lookAts: {
          'stuff': 'You see stuff'
        },
        actions: {
          'execute': function(input, print) {
            if ('action' === input(1)) {
              print('You execute the action!');
              return true;
            }

            return false;
          }
        },
        exits: {
          'north': 'room2'
        }
      }),
      world = new tg.World();

  world.add('room1', room1);
  world.add('room2', new tg.Room({ description: "room2" }));


  beforeEach(function () {
    lastOutput = null;
    tg.currentRoom(room1);
  });

  it("should look", function() {
    parse("look")();
    expectOutput("foo");
  });


  it("should look at", function() {
    parse("look at stuff")();
    expectOutput("see stuff");
  });

  it("should fail to look at", function() {
    parse("look at stuff2")();
    expectOutput("see no stuff2");
  });

  it("should go north", function() {
    parse("north")();
    expectOutput("room2");
  });

  it("should go north", function() {
    parse("go north")();
    expectOutput("room2");
  });

  it("should parse unknown command", function() {
    parse("oogie boogie boo")();
    expectOutput("command:");
  });

  it("should ignore unnecessary white space and mixed cases", function() {
    parse(" loOk   At   sTUFf  ")();
    expectOutput("see stuff");
  });

  it("should not execute action", function() {
    parse("execute stuff")();
    expectOutput("Unknown");
  });

  it("should execute action", function() {
    parse("execute action")();
    expectOutput("You execute");
  });

  it("should show help", function() {
    parse("help")();
    expectOutput("Available commands");
  });

  it("should hide hidden commands from help", function() {
    parse("help")();
    expectNotInOutput("uknownCmd");
  });

  it("should support command aliases", function() {
    parse("la stuff")();
    expectOutput("see stuff");
  });

  it("should only expand first token", function() {
    parse("la la")();
    expectOutput("no la here");
  });

  it("should have alias command", function() {
    parse("alias")();
    expectOutput("Available aliases");
  });
});
