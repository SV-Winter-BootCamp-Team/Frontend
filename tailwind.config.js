/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			resize: {
				none: 'none',
				both: 'both',
				horizontal: 'horizontal',
				vertical: 'vertical',
			},
		},
	},
	plugins: [],
	mode: 'jit',
}
