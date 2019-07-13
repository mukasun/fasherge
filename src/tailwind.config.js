/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const config = {
  theme: {
    extend: {
      colors: {
        base: '#08d9d6',
        gray: {
          lightest: '#f2f2f2'
        }
      }
    }
  },
  variants: {},
  plugins: []
}

module.exports = config
module.exports.colors = config.theme.extend.colors