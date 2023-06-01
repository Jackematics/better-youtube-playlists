module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "background-dark-blue": '#011F4B',
      "container-dark-blue": '#03396C',
      "container-light-blue": '#005B96',
      "select-highlight-blue": '#D0E5F5',
      "hover-highlight-blue": '#B3CDE0',
      "button-highlight-blue": '#819FB5',
      "button-select-blue": '#5F7687',
      "black": '#000000',
      "white": '#FFFFFF',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
