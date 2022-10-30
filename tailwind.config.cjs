/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "first-grd": "#13111C",
        "sec-grd": "#160E26",
        "bg-circle": "#0F1B33",
        "circle-br" : "#306EE8",
        "inp-color": "#181622",
        "btn-prim": "#A667E4",
        "btn-sec": "#BC8DEB",
        "dash": "#42946E",
        "circle-dash": "#15231D",
        "dash-grd-prim": "#853BCE",
        "dash-grd-sec": "#613BCE"
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
}
