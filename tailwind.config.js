module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        marketplaceColor: '#05c005',
        marketplaceColorLight: '#40e340',
        marketplaceColorDark: '#0d4b0d',
      },
      font: {
        FallingSky: 'FallingSky, sans-serif',
      },
      maxWidth: {
        custom: '57rem',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
