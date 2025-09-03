import { shadcnPreset } from "shadcn-ui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  presets: [shadcnPreset],  // 👈 Required for shadcn components
  theme: {
    extend: {},
  },
  plugins: [],
};
