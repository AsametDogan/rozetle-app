const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        rzt_bg: "#ECF0F1",
        rzt_blue: "#3498db", // ana renk
        rzt_blue_dark: "#2980b9", // vurgu rengi

        rzt_green: "#2ecc71", // parlak -  arkadaşık sosyallik
        rzt_green_dull: "#27ae60", // mat - pozitif etkileşim 


        rzt_orrange: "#D28D60",// sıcaklık enerji
        rzt_orrange_dark: "#d35400",// vurgu - dikkat

        rzt_purple_light: "#7F56D9",// ayrıcalık - özel rozet lüks - özel teklifler
        rzt_purple: "#9b59b6",// ayrıcalık - özel rozet lüks - özel teklifler
        rzt_purple_dark: "#8e44ad",// özel etkinlikler - özel kullanıcılar

        rzt_gray_dark: "#95a5a6",// metin detaylar
      }

    },
    screens: {


      lg1: { max: "1160px" },

      "2xl": { max: "1490px", min: "1280px" },
      xl: { max: "1279px", min: "1161px" },
      lg: { max: "1160px", min: "781px" },
      md: { max: "780px", min: "501px" },
      sm: { max: "500px", min: "1px" },

      "up-sm": { min: "500px" },
      "up-md": { min: "780px" },
      "up-lg": { min: "1160px" },
      "up-xl": { min: "1279px" },
      "up-2xl": { min: "1491px" },


      "down-md": { max: "780px" },
      "down-lg": { max: "1160px" },
      "down-xl": { max: "1279px" },
      "down-2xl": { max: "1491px" },
    },
  },
  plugins: [],
});
