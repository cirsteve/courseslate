module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        watch: {
            less: {
                files: ['src/courseslate/css/*.less'],
                tasks: ['less']
            },
            handlebars: {
                files: ['src/courseslate/templates/**/*.js'],
                tasks: ['handlebars']
            },
            concat: {
                files: ['src/courseslate/js/**/*.js'],
                tasks: ['concat']
            },
            shell: {
                files: ['static_files/**/*'],
                tasks: ['shell']
            }
        },
        less: {
            files: {
                dest: 'static_files/css/base.css',
                src: 'src/courseslate/css/*.less'
            }
        },
        shell: {
            collectstatic: {
                command: 'python manange.py collectstatic --noinput'
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'TMPL',
                    processName: function (path) {
                        var pathString = path.split('/').slice(3).join('_');
                        // slice off .js extension
                        return pathString.slice(0, pathString.length-3);
                    }
                },
                files: {
                    'static_files/js/templates.js':'src/courseslate/templates/**/*.js'
                }
            }
        },
        concat: {
            courseslate: {
                dest: "static_files/js/compiled.js",
                src: [
                    "src/courseslate/js/boot-data.js",
                    "src/courseslate/js/models/base.js",
                    "src/courseslate/js/models/*.js",
                    "src/courseslate/js/collections/base.js",
                    "src/courseslate/js/collections/*.js",
                    "src/courseslate/js/views/base/base.js",
                    "src/courseslate/js/views/base/page.js",
                    "src/courseslate/js/views/base/*.js",
                    "src/courseslate/js/views/**/*.js",
                    "src/courseslate/js/router/router.js",
                    "src/courseslate/js/router/*.js",
                    "src/courseslate/js/start.js"
                    ]
            }
        }
    });

    grunt.registerTask('default', 'watch');
};
