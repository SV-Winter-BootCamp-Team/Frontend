/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				slider: {
					'0%': {
						transform: 'translateX(0px)',
					},
					'100%': {
						transform: 'translateX(2790px)',
					},
				},
				reverse_slider: {
					'0%': {
						transformm: 'translateX(0px)',
					},
					'100%': {
						transform: 'translateX(-2790px)',
					},
				},
			},
			animation: {
				slider: 'slider 20s linear infinite',
				reverse_slider: 'reverse_slider 20s linear infinite',
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'animate-delay': (value) => ({
						animationDelay: value,
					}),
				},
				{ values: theme('transitionDelay') },
			)
		}),
	],
}
