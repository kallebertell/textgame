
Text game v5

Changelog:
  - Some styling
  - Support for static aliases
  - alias command to list available aliases
  - simplified parse.js even more; now if you add a command it needs only
    to be added to the commands namespace and you don't need to touch
    parse.js
  - moved all libary code (ie. reusable code) to the 'tg' folder.
  - moved all app specific code tp the 'app' folder (ie. non-reusable code)
  - Removed the addExit method in favour of declaring exits in Room constructor
    Problem before was that you can't refer to a room that hasn't been declared yet;
    now you use a room id to refer to the target room instead of actual object reference.
  - Added support for comma-separated lookAts and actions

Dev instructions
- install node & npm
- install bower
- cd v5
- bower install

Run tests by opening spec/SpecRunner.html in a browser

Run app by opening src/index.html in a browser
