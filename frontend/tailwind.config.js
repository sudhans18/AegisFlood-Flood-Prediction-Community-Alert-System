/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563EB',
        'dark-black': '#000000',
        'light-gray': '#F5F5F5',
        'border-gray': '#E0E0E0',
        'dark-gray': '#757575',
        'status-safe': '#34C759',
        'status-medium': '#FFCC00',
        'status-high': '#FF9500',
        'status-critical': '#DC2626',
        'status-alert': '#FF3B30',
        'status-completed': '#34C759'
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.5rem'
      }
    }
  },
  plugins: []
}




