/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                pixel: ['Outfit', 'sans-serif'], // Replacing pixel font with Outfit as requested
            },
        },
    },
    plugins: [],
}
