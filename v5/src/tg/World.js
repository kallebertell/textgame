var tg = tg || {};

tg.World = (function(Room) {

  function World() {
    this.rooms = {};
  }

  World.prototype.add = function(id, room) {
    if (!(room instanceof Room)) {
      room = new Room(room);
    }

    room._world = this;
    this.rooms[id] = room;
  };

  World.prototype.get = function(id) {
    if (!this.rooms[id]) {
        throw new Error('No room registered with the id: ' + id);
    }

    return this.rooms[id];
  }

  return World;
})(tg.Room);
