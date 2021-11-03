module.exports = {
    purge   : ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme   : {
        extend: {
            colors    : {
                primary: {
                    DEFAULT: '#2980B9',
                    '50'   : '#D2E7F5',
                    '100'  : '#BEDCF0',
                    '200'  : '#94C6E7',
                    '300'  : '#6AB0DE',
                    '400'  : '#409AD5',
                    '500'  : '#2980B9',
                    '600'  : '#20638F',
                    '700'  : '#164666',
                    '800'  : '#0D293C',
                    '900'  : '#040C12',
                },
            },
            fontFamily: {
                body: ['Open Sans', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins : [],
};
