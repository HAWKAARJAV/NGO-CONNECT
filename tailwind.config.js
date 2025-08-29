/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)', /* subtle off-white with green undertones */
        foreground: 'var(--color-foreground)', /* dark green-gray */
        border: 'var(--color-border)', /* muted secondary border */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* deep forest green */
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)' /* dark green-gray */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)' /* dark green-gray */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* light green-tinted gray */
          foreground: 'var(--color-muted-foreground)' /* muted green-gray */
        },
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* softer sage green */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm orange */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* vibrant green */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* warm amber */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)' /* white */
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        'interactive': '8px',
        'content': '4px'
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'pronounced': 'var(--shadow-pronounced)'
      },
      transitionDuration: {
        'smooth': '200ms',
        'layout': '300ms'
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'layout': 'ease-in-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}