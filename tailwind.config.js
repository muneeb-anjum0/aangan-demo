export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      width: {
        '112': '28rem', // Between w-96 (24rem) and w-120 (30rem)
        '120': '30rem', // 150% of w-80 (20rem * 1.5 = 30rem)
      },
    },
  },
  plugins: [],
}