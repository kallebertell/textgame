
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var yeomanConfig = {
    app: 'src',
    dist: 'dist'
  };

  var watchConfig = {
    options: {
      nospawn: true,
      livereload: LIVERELOAD_PORT
    },
    livereload: {
      files: [
        'src/**/*.html',
        'src/**/*.js'
      ]
    },
    tasks: ['jshint', 'karma:unit:run']
  };

  var connectConfig = {
    options: {
      port: 9000,
      hostname: 'localhost'
    },
    livereload: {
      options: {
        middleware: function (connect) {
          return [
            lrSnippet,
            mountFolder(connect, '.'),
            mountFolder(connect, yeomanConfig.app)
          ];
        }
      }
    }
  };

  var karmaConfig = {
    unit: {
      configFile: 'karma.conf.js',
      autoWatch: true
    }
  };

  var jshintConfig = {
    files: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js'],
    options: {
      globals: {
        jQuery: true,
        console: true,
        module: true,
        require: true,
        '$': true,
        '_': true
      }
    }
  };

  var useminPrepareConfig = {
    html: 'src/index.html',
    options: {
      dest: 'dist'
    }
  };

  var useminConfig = {
    html: 'dist/index.html'
  };

  var copyConfig = {
    main: {
      files: [ { src: 'src/index.html', dest: 'dist/index.html' } ]
    }
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: watchConfig,
    connect: connectConfig,
    karma: karmaConfig,
    jshint: jshintConfig,
    useminPrepare: useminPrepareConfig,
    usemin: useminConfig,
    copy: copyConfig
  });

  grunt.registerTask('server', ['connect:livereload', 'watch']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['jshint', 'useminPrepare', 'concat', 'uglify', 'copy:main', 'usemin']);

};
