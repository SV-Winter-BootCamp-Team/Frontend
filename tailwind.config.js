/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				slider: {
					'0%': {
						transform: 'translateX(-1400px)',
					},
					'100%': {
						transform: 'translateX(0px)',
					},
				},
				reverse_slider: {
					'0%': {
						transformm: 'translateX(0px)',
					},
					'100%': {
						transform: 'translateX(-1400px)',
					},
				},
			},
			animation: {
				slider: 'slider 10s linear infinite',
				reverse_slider: 'reverse_slider 7s linear infinite',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
}
