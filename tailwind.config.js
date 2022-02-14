module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            'jakarta': 'Plus Jakarta Sans'
        }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}
