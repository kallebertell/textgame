var tg = tg || {};

tg.currentRoom = (function() {
  var _currentRoom;

  return function currentRoom(nextRoom) {
    if (!nextRoom) {
      return _currentRoom;
    } else {
      _currentRoom = nextRoom;
    }
  };

})();
