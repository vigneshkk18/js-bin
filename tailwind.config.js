/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        activeLight: "#ffffff",
        headerLight: "#ededed",
        inactiveLight: "#f7f7f7",
        buttonHover: "rgba(0,0,0,0.04)",
        buttonActive: "hsl(215, 100%, 96%)",
      },
      colors: {
        primary: "#232323",
        secondary: "#00aaff",
        tertiary: "rgba(0,0,0,0.5)",
        panel: "rgb(247, 247, 247)",
        panelActive: "#ffffff",
      },
      borderColor: {
        light: "#bfbfbf",
        button: "#ccc",
        resizer: "rgba(218, 218, 218, 0.5)",
        resizerActive: "#39f",
      },
    },
  },
  plugins: [],
};
