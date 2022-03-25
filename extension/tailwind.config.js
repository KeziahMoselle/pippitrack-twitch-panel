module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white: {
        DEFAULT: '#FFFFFF',
      },
      black: {
        DEFAULT: '#18181b',
        dark: '#0e0e10',
        light: '#8b8b8d',
      },
      purple: {
        DEFAULT: '#b3306b',
        accent: '#FF66AB',
        light: '#b7b1e5',
        detail: '#d194af',
      },
      yellow: {
        DEFAULT: '#ea0'
      }
    },
    extend: {
      zIndex: {
        under: '-1',
        goku: '9999',
      },
      fontSize: {
        xxxs: '8px',
        xxs: '10px'
      },
      margin: {
        small: '2px',
      }
    },
  },
  plugins: [
    require('@whiterussianstudio/tailwind-easing'),
  ],
}