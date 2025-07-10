/** @type {import('tailwindcss').Config} */
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: withOpacityValue("--border"),
        input: withOpacityValue("--input"),
        ring: withOpacityValue("--ring"),
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
        primary: {
          DEFAULT: withOpacityValue("--primary"),
          foreground: withOpacityValue("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacityValue("--secondary"),
          foreground: withOpacityValue("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: withOpacityValue("--destructive"),
          foreground: withOpacityValue("--destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacityValue("--muted"),
          foreground: withOpacityValue("--muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacityValue("--accent"),
          foreground: withOpacityValue("--accent-foreground"),
        },
        popover: {
          DEFAULT: withOpacityValue("--popover"),
          foreground: withOpacityValue("--popover-foreground"),
        },
        card: {
          DEFAULT: withOpacityValue("--card"),
          foreground: withOpacityValue("--card-foreground"),
        },
        gray: {
          50: 'hsl(0, 0%, 98%)',
          100: 'hsl(240, 5%, 96%)',
          200: 'hsl(240, 6%, 90%)',
          300: 'hsl(240, 5%, 84%)',
          400: 'hsl(240, 5%, 65%)',
          500: 'hsl(240, 4%, 46%)',
          600: 'hsl(240, 5%, 34%)',
          700: 'hsl(240, 5%, 26%)',
          800: 'hsl(240, 4%, 16%)',
          900: 'hsl(240, 6%, 10%)',
          950: 'hsl(240, 10%, 4%)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};