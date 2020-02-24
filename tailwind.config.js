var _ = require('lodash')
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default

module.exports = {
  theme: {
    extend: {
      width: {
        '1/9': 'calc(1/9*100%)'
      },
      fontSize: {
        xxxs: '.5rem',
        xxs: '.6rem'
      },
      lineHeight: {
        zero: 0
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [
    function({ addUtilities, e, theme, variants }) {
      const colors = flattenColorPalette(theme('borderColor'))

      const utilities = _.flatMap(
        _.omit(colors, 'default'),
        (value, modifier) => ({
          [`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
          [`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
          [`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
          [`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` }
        })
      )
      addUtilities(utilities, variants('borderColor'))
    }
  ]
}
