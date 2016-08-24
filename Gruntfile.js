module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { separator: ';'},
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/<%= pkg.name %>.min.js'
      }
    },

    gitpush: {
      your_target: {
        options: {
          //target options
          branch: 'master',
          // remote: 'live2'
          remote: 'ssh://root@104.131.135.222/root/bare'

        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    clean: {
      build: ['public/dist']
    },

    nodemon: {
      dev: {
        script: './server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/<%= pkg.name %>.min.js' : ['public/client/**/*.js']
        }
      }

    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/**/*.js',
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/<%= pkg.name %>.min.css' : ['public/**/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);


  grunt.registerTask('build', [
    'test',
    'eslint',
    'concat',
    'cssmin', 
    'uglify'
  ]); 

  grunt.registerTask('pushToProd', [
    'gitpush'
  ]);  

  grunt.registerTask('default', [
    'build'
  ]);  


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {

    if (grunt.option('prod')) {
      grunt.task.run(['build', 'pushToProd']);
    } else {
      grunt.task.run(['build', 'server-dev']);
    }
    
  }); 
};
