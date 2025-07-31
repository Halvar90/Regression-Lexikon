import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "hsl(142.1 76.2% 41%)", // Ein leuchtendes Grün
          foreground: "hsl(0 0% 98%)", // Heller Text für die Akzentfarbe
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            'h1': {
              fontSize: '2.5rem',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '1rem',
            },
            'h2': {
              fontSize: '1.875rem',
              fontWeight: '600',
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '0.5rem',
            },
            'h3': {
              fontSize: '1.25rem',
              fontWeight: '500',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            'p': {
              marginBottom: '1.5rem',
              color: '#374151',
            },
            'ul, ol': {
              marginBottom: '1.5rem',
              paddingLeft: '1.5rem',
            },
            'li': {
              marginBottom: '0.5rem',
            },
            'strong': {
              fontWeight: '700',
              color: '#111827',
            },
            'em': {
              fontStyle: 'italic',
            },
            'blockquote': {
              borderLeft: '4px solid #3b82f6',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              margin: '1.5rem 0',
            },
            'code': {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'pre': {
              backgroundColor: '#f3f4f6',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              border: '1px solid #e5e7eb',
            },
            'hr': {
              margin: '2rem 0',
              borderColor: '#d1d5db',
            },
            'a': {
              color: '#3b82f6',
              textDecoration: 'underline',
              '&:hover': {
                color: '#2563eb',
              },
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            'h1, h2, h3': {
              color: '#f9fafb',
            },
            'p': {
              color: '#d1d5db',
            },
            'strong': {
              color: '#ffffff',
            },
            'blockquote': {
              backgroundColor: '#374151',
              borderLeftColor: '#3b82f6',
            },
            'code': {
              backgroundColor: '#374151',
              color: '#d1d5db',
            },
            'pre': {
              backgroundColor: '#374151',
              borderColor: '#4b5563',
            },
            'hr': {
              borderColor: '#4b5563',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 