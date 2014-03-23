describe("Room", function() {

  var room = new tg.Room({
        description: function() {
          if (this.actionExecuted) {
            return 'action executed';
          }

          return 'foo';
        },
        lookAts: {
        	'thing': function() {
        		return 'You see a thing';
        	},
          'field,battlefield': function() {
            return 'You see an enormous battlefield';
          }
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

  });


  it("should return desc", function() {
    expect(room.description()).toBe('foo');
  });

  it("should have action", function() {
    expect(room.hasAction('execute')).toBeTruthy();
  });

  it("should support look at funcs", function() {
  	expect(room.getLookAt('thing')).toBe('You see a thing');
  });

  it("should not have non-existant lookAt", function() {
    expect(room.hasLookAt('nothere')).toBeFalsy();
  });

  it("should support adding comma-separated-lookAts", function() {
    expect(room.hasLookAt('field')).toBeTruthy();
    expect(room.hasLookAt('battlefield')).toBeTruthy();
  });
});
