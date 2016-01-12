'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer']
            },
            js: {
                files: 'assets/js/**/*.js',
                tasks: ['concat:dev']
            },
            images: {
                files: ['assets/images/**/*.{png,jpg,gif}']
            }
        },

        clean: {
            options: {
                force: true
            },
            dist: ['dist']
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

        // Only concat js files in dev mode
        concat: {
            dev: {
                src: ['assets/js/**/*.js', 'assets/js/**/*.min.js'],
                dest: 'dist/js/main.js'
            }  
        },

        // uglify to concat, minify, and make source maps for js files
        uglify: {
            main: {
                options: {
                    sourceMap: 'dist/js/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'dist/js/main.js': 'assets/js/**/*.js'
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
            },
            tbsfonts: {
                expand: true,
                src: ['assets/fonts/bootstrap/*'],
                dest: 'dist/fonts/bootstrap',
                filter: 'isFile',
                flatten: true
            }
        },

    });

    // register tasks
    grunt.registerTask('default', ['clean', 'sass:dev', 'autoprefixer', 'concat:dev', 'copy', 'watch']);
    grunt.registerTask('prod', ['clean', 'sass:prod', 'autoprefixer', 'uglify:main', 'copy']);

};
