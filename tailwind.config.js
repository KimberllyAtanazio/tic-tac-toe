/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customPurple: '#5A1E76', 
        newGameHover: '#c4a0d6',
        box: '#2B0040',
        cell: '#43115B',
        cellHover: '#5A1E76',
        gameOver: '#387E39',
        xCollor: "#48d2fe",
        oCollor: "#e2be00",
        drawCollor: "#BCDBF9",
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

