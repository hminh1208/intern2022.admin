const colors = require('tailwindcss/colors');
module.exports = {
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['Oswald', 'sans-serif'],
            body: ['Poppins', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '1.5rem',
        },
        extend: {
            colors: {
                yellow123: '#EDAE0A',
                blue: {
                    950: '#17275c',
                },
            },
        },
    },
    plugins: [],
};
