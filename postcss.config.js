const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './the_sudoku/sudoku/templates/sudoku/**/*.html',
    './the_sudoku/templates/**/*.html',
    './the_sudoku/sudoku/src/**/*.js',
    './the_sudoku/sudoku/src/**/*.css'
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
