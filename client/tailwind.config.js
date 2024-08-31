
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E40AF',
        customPink: '#DB2777',
        'light-blue': '#e0f7fa',
        Accent: '#FF5733',
        Background: '#F8F9FA',
        Secondary: '#1F1F1F',
        Background1:'#ADBADA',
        Skyblue:"#7091E6",
        line:'#3E52A1',
        item:'#EEE8F6',
        button:'#3E52A1'
      },
    },
  },
  plugins: [],
});