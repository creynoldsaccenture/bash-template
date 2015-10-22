'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer', 'concat_css']
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
                    'dist/styles/main.css': 'assets/scss/app.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'dist/styles/main.css': 'assets/scss/app.scss'
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
                src: 'dist/styles/*.css',
                dest: 'dist/styles'
            },
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                expand: true,
                cwd: 'dist/styles',
                src: ['*.css', '!*.min.css'],
                ext: '.css'
            }
        },

        concat_css: {
            options: {},
            all: {
              src: ['assets/css/**/*.css', 'dist/styles/**/*.css'],
              dest: 'dist/styles/main.css'
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
                    sourceMap: 'dist/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'dist/js/main.min.js': 'assets/js/**/*.js'
                }
            }
        },

        copy: {
            images: {
                expand: true,
                src: ['assets/images/*'],
                dest: 'dist/images/',
                filter: 'isFile',
                flatten: true
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
    grunt.registerTask('default', ['sass:dev', 'autoprefixer', 'concat_css', 'uglify:main', 'copy:images', 'watch']);

};
