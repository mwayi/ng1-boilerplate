const elixir = require('laravel-elixir');
const fileInclude = require('gulp-file-include');
const gulp = require('gulp');
const Task = elixir.Task;

const Ng1Assembler = require('ng1-assembler');
const NgTemplate = Ng1Assembler.template;
const NgScripts = Ng1Assembler.script;

elixir.config.assetsPath = './src/resources/assets/';

/*
 | 
 | Task: Compile Ng Templates
 |
 */
elixir.extend('compileNgTemplates', function() {
    // Compile and watch angular templates into js
    new Task('compile-ng-templates', function() {
        var ngTemplate = new NgTemplate([
            './src/**Page.html', 
            './src/**.tpl.html', 
            './src/**Directive.html']);
        ngTemplate.writeToFile('./build/public/assets/js/templates.js');
    })
    .watch('./src/**/**.html');
});

/*
 | 
 | Task: Compile Ng Scripts
 |
 */
elixir.extend('compileNgScripts', function() {
    // Compile and watch angular scripts into js
    new Task('compile-ng-scripts', function() {
        var ngScripts = new NgScripts(['./src/app/**/**.js', './src/configs/**.js'], 'app', ['ngRoute']);
        ngScripts.writeToFile('./build/public/assets/js/app.js');
    })
    .watch(['./src/app/**/**.js', './src/configs/**.js']);
});


/*
 | 
 | Task: Elixir builds
 |
 */
elixir(function(mix) {
    
    // Port the compiled sass to public.
    mix.sass('app.scss', './build/public/assets/css/app.css');

    // Port the main app index to build. 
    // This index app needs to be built with templates.
    mix.copy('./src/resources/views/index.html', './build/public');

    // Port the vendor scripts.
    mix.scripts(
        [
            '../../../../node_modules/jquery/dist/jquery.js',
            '../../../../node_modules/angular/angular.js',
            '../../../../node_modules/angular-route/angular-route.js',
        ], 
        './build/public/assets/js/vendor.js'
    );

    // Port the app scripts.
    mix.scripts(
        [
            'app.js',
        ], 
        './build/public/assets/js/app.js'
    );

    // Port images across.
    mix.copy('./src/resources/assets/img', './build/public/assets/img');

    // Port fixtures across.
    mix.copy('./fixtures', './build/public/fixtures');

    // Compile ng templates
    mix.compileNgTemplates();

    // Compile ng scripts
    mix.compileNgScripts();

});