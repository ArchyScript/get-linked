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
        primary: { 
          '1': "#FF29B9",
          '2': "#D434FE",
          '3': "#9A39FF",
          '4': "#FE34B9",
          '5': "#FF26B9",
          '6': "#903AFF",
          '7': "#150E28", 
        }, 
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        UnicaOne: ['Unica One', 'sans-serif'],
        ADLaMDisplay: ['ADLaM Display', 'sans-serif']
      },
    },
  },
}
 