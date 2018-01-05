let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your theme. By default, we are compiling the Sass file for the theme
 | as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('dist')
  .options({
    processCssUrls: false,
    uglify: {
      uglifyOptions: {
        sourceMap: true,
        compress: {
          warnings: false,
          drop_console: true,
        },
        output: {
          comments: false
        }
      }
    }, 
  })
   .js('src/app.js', 'scripts/')
   .extract([
      'jquery',
      'axios',
      'babel-polyfill',
      'lodash',
      'tether',
      'vue',
      'vuex',
      'vuex-localstorage'
   ])
  .sass('src/styles/app.scss', 'styles/')
   .copyDirectory('src/assets', 'dist/assets')
   .version();
