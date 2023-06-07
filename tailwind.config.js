/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'vesseltrust-dark': '#111111',
        'vesseltrust-semi-dark': '#202128',
        'vesseltrust-blue-main': '#336DFF',
        'vesseltrust-light': '#D9D9D9',
      },

      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
}
