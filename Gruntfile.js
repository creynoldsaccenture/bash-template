'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['assets/sass/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer', 'concat_css']
            },
            js: {
                files: 'assets/js/**/*.js',
                tasks: ['uglify']
            },
            images: {
                files: ['assets/images/**/*.{png,jpg,gif}'],
                //tasks: ['imagemin']
            }
        },

        // sass
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'public/styles/build/main.css': 'assets/sass/app.scss'
                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: 'public/styles/build/*.css',
                dest: 'public/styles/build'
            },
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                expand: true,
                cwd: 'public/styles/build',
                src: ['*.css', '!*.min.css'],
                ext: '.css'
            }
        },

        concat_css: {
            options: {},
            all: {
              src: ['assets/css/**/*.css', 'public/styles/build/**/*.css'],
              dest: 'public/styles/build/main.css'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'assets/js/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            main: {
                options: {
                    sourceMap: 'public/js/build/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'public/js/build/main.min.js': [ 'assets/js/vendor/jquery-1.11.2.js', 'assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js', 'assets/js/main.js' ]
                }
            }
        },

        // deploy via rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                 options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            },
            production: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            }
        }

    });

    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default', ['sass:dev', 'autoprefixer', 'concat_css', 'uglify:main', 'watch']);

};
