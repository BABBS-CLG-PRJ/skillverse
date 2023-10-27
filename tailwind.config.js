/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
  ], 
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
      colors: {
        'primary-violet': '#320E38', 
        'primary-yellow':'#E59500',
        'primary-gray':'#C4C4CE',
        'primary-body':"#FFEDDF",
        "black-100": "#2B2C35",
        "primary-accent-color":"#652429",
        "greenLight": "#61cea6",
          "primary-blue": {
            DEFAULT: "#2B59FF",
            100: "#F5F8FF",
          },
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        caribbeangreen: {
          5: "#C1FFFD",
          25: "#83F1DE",
          50: "#44E4BF",
          100: "#06D6A0",
          200: "#05BF8E",
          300: "#05A77B",
          400: "#049069",
          500: "#037957",
          600: "#026144",
          700: "#014A32",
          800: "#01321F",
          900: "#001B0D",
        },
        richblue: {
          5: "#ECF5FF",
          25: "#C6D6E1",
          50: "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2D5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#042E3B",
          700: "#032833",
          800: "#01212A",
          900: "#001B22",
        },
        "pure-greys": {
          5: "#F9F9F9",
          25: "#E2E2E2",
          50: "#CCCCCC",
          100: "#B5B5B5",
          200: "#9E9E9E",
          300: "#888888",
          400: "#717171",
          500: "#5B5B5B",
          600: "#444444",
          700: "#2D2D2D",
          800: "#171717",
          900: "#141414",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

