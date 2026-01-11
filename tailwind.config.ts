/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'sans-serif'],
            },
            fontSize: {
                // Large Title
                'title-large': ['32px', { lineHeight: '120%', fontWeight: '600' }],

                // Title 1-3
                'title-1': ['22px', { lineHeight: '120%', fontWeight: '600' }],
                'title-2': ['20px', { lineHeight: '120%', fontWeight: '600' }],
                'title-3': ['18px', { lineHeight: '120%', fontWeight: '600' }],

                // Body 1-5
                'body-1': ['18px', { lineHeight: '160%', fontWeight: '400' }],
                'body-2': ['16px', { lineHeight: '160%', fontWeight: '600' }],
                'body-3': ['16px', { lineHeight: '160%', fontWeight: '400' }],
                'body-4': ['14px', { lineHeight: '160%', fontWeight: '600' }],
                'body-5': ['14px', { lineHeight: '160%', fontWeight: '400' }],

                // Detail
                'detail': ['12px', { lineHeight: '160%', fontWeight: '400' }],
            },
            colors: {
                // Primary Color (Purple)
                primary: {
                    0: '#E7D0F9',
                    50: '#D7CAEF',
                    100: '#C7B8E5',
                    150: '#B7A3DA',
                    200: '#A7A8F0',
                    300: '#8860BC',
                    400: '#664A97',
                    500: '#461B03',
                    600: '#381676',
                    700: '#2A1058',
                    800: '#1C0B3B',
                    850: '#15082C',
                    900: '#0E051D',
                    950: '#07030F',
                },

                // Secondary Color (Green)
                secondary: {
                    200: '#B2FFD9',
                    300: '#AAF2CE',
                    400: '#A1E5C3',
                    500: '#98D988',
                    600: '#B7A3DA',
                    700: '#74A68D',
                    800: '#628C77',
                    900: '#507362',
                },

                // Grey Color
                grey: {
                    0: '#F7F7FA',
                    50: '#EFEFF4',
                    100: '#E2E2E8',
                    200: '#D1D1D8',
                    300: '#888BC0',
                    400: '#9A9AA3',
                    500: '#6F6F78',
                    600: '#4F4F57',
                    700: '#3A3A40',
                    800: '#1F1F24',
                },

                // Status Color
                status: {
                    alert: '#F33326',
                    caution: '#F4A340',
                    positive: '#41CC83',
                },

                // Text Color
                text: {
                    primary: '#17171A',
                    alternative: '#6F6F78',
                    assistive: '#9A9AA3',
                    disabled: '#888BC0',
                },

                // Background Color
                background: '#F7F7FA',

                // White & Black
                white: '#FFFFFF',
                black: '#000000',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to bottom, #F7F7FA, #D7CAEF)'
            }
        },
    },
    plugins: [],
}