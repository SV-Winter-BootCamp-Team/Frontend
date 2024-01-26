/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				jua: ['Jua', 'sans-serif'],
			},
			resize: {
				none: 'none',
				both: 'both',
				horizontal: 'horizontal',
				vertical: 'vertical',
			},
			keyframes: {
				slider: {
					'0%': {
						transform: 'translateX(0px)',
					},
					'100%': {
						transform: 'translateX(745%)',
					},
				},
				reverse_slider: {
					'0%': {
						transform: 'translateX(0px)',
					},
					'100%': {
						transform: 'translateX(-745%)',
					},
				},
			},
			animation: {
				slider: 'slider 55s linear infinite',
				reverse_slider: 'reverse_slider 55s linear infinite',
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
	mode: 'jit',
}
