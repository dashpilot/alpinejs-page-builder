/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                cream: '#FAF7F2',
                sage: '#8B9D83',
                earth: {
                    100: '#E5E1DB',
                    900: '#2C2420',
                },
            },
        },
    },
    plugins: [],
};
