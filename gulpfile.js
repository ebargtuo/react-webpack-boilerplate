"use strict";

var gulp = require("gulp");

var pkg = require("./package.json");
var config = pkg.projectConfig;

//
// HELPER TASKS
//

gulp.task("clean", function(done) {
    require("del")([
        config.dirs.dist
    ], done);
});

gulp.task("copy", [
    "copy:src",
    "copy:normalize"
]);

gulp.task("copy:src", function() {
    return gulp.src(config.dirs.src + "/**")
               .pipe(gulp.dest(config.dirs.dist));
});

gulp.task("copy:normalize", function() {
    return gulp.src("node_modules/normalize.css/normalize.css")
               .pipe(gulp.dest(config.dirs.vendor + "/css"));
});

//
// MAIN TASKS
//

gulp.task("default", [
    "clean",
    "copy"
]);
