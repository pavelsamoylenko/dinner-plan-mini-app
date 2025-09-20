/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Telegram theme colors will be set via CSS variables
                'tg-bg': 'var(--tg-bg-color)',
                'tg-text': 'var(--tg-text-color)',
                'tg-hint': 'var(--tg-hint-color)',
                'tg-link': 'var(--tg-link-color)',
                'tg-button': 'var(--tg-button-color)',
                'tg-button-text': 'var(--tg-button-text-color)',
                'tg-secondary-bg': 'var(--tg-secondary-bg-color)',
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
            }
        },
    },
    plugins: [],
}