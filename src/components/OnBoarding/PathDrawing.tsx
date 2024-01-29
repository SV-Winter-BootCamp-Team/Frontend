import { useEffect } from 'react'

export default function PathDrawing() {
	useEffect(() => {
		const content = document.querySelector('#content')! as HTMLElement
		const path = document.querySelector('#path')! as SVGGeometryElement
		const pathLength = path.getTotalLength()

		path.style.strokeDasharray = pathLength + ' ' + pathLength
		path.style.strokeDashoffset = calcDashoffset(
			window.innerHeight,
			content,
			pathLength,
		).toString()

		function calcDashoffset(
			scrollY: number,
			element: HTMLElement,
			length: number,
		) {
			const ratio = (scrollY - element.offsetTop) / element.offsetHeight
			const value = length - length * ratio
			return value < 0 ? 0 : value > length ? length : value
		}

		function scrollHandler() {
			const scrollY = window.scrollY + window.innerHeight
			path.style.strokeDashoffset = (
				1.5 * calcDashoffset(scrollY, content, pathLength)
			).toString()
		}

		window.addEventListener('scroll', scrollHandler)
	}, [])

	return (
		<div id="content" className="w-full h-full">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.28 640.48">
				<path
					className="fill-none stroke-[#66c0d0]"
					id="path"
					d="M81.41,0c.13,2.31.3,5.66.44,9.7.14,3.78.22,6.11.22,8.61-.02,6.82-.03,10.23-.81,12.76-2.17,7.05-9.72,6.92-24,16.3-8.61,5.66-15.63,10.26-15.41,15.7.27,6.63,11.1,11.13,15.7,13.04,11.46,4.76,22.12,5.42,55.41,2.07,31.2-3.13,39.4-5.47,41.78-11.56,1.44-3.68.5-8.08-1.19-10.96-4.5-7.71-15.82-7.19-17.19-7.11-1.74.1-12.65.97-15.7,8.3-3.22,7.74,4.45,17.67,11.85,21.93,4.31,2.48,7.93,2.69,17.78,2.97,23.39.66,35.35.97,48.29-.3,10.49-1.03,15.73-1.55,19.85-2.96,11.63-4,14.5-9.51,26.96-12.44,5.72-1.35,10.35-1.42,14.81-1.48,0,0,10.97-.16,23.11,2.67,24.51,5.71,52.87,26.48,55.11,28.15-3.6,9.24-1.75,17.77,3.11,20.62.92.54,3.11,1.56,6.81.89,5.28-2.2,10.57-4.39,15.85-6.59,1.53-6.85,3.05-13.69,4.58-20.54-1.6-1.71-3.2-3.42-4.8-5.14,3.76,4.2,7.52,8.41,11.28,12.61-1.75,6.74-3.5,13.47-5.25,20.21-1.8,5.3-6.97,8.57-12.17,7.93-4.46-.55-8.25-3.92-9.49-8.48,1.24,4.56,5.02,7.93,9.49,8.48,5.19.65,10.37-2.63,12.17-7.93,2.1-.29,5.89-1.16,9.15-4.13,5.16-4.69,6.84-12.66,4.47-20.43-3.65-4.06-7.29-8.11-10.94-12.17-5.34,2.32-10.68,4.65-16.02,6.97-.73,2.96-1.45,5.92-2.18,8.88,1.53-6.21,3.05-12.43,4.58-18.64,5.25-2.34,10.49-4.69,15.74-7.03.59.03,7.28.43,10.72,6.03,2.94,4.79,2.24,11.35-1.9,15.96,4.14-4.61,4.84-11.17,1.9-15.96-3.44-5.6-10.13-6-10.72-6.03-1.19-4.73-5.14-8.18-9.71-8.6-5.32-.49-10.48,3.22-11.83,8.82-1.53,6.55-3.05,13.1-4.58,19.65,3.51,4.13,7.03,8.25,10.54,12.38,2.48-1.15,4.96-2.3,7.44-3.44-5.06,2.34-10.12,4.69-15.18,7.03-4.02-4.32-8.04-8.63-12.06-12.95-.28-.64-3.31-7.99,1.12-15.07,4.32-6.91,11.97-7.54,12.73-7.59-1.05-3.21-3.33-11.62-.45-21.66,3.3-11.48,11.43-17.77,14.96-20.43,19.48-14.67,45.26-8.83,52.73-7.14,3.08.7,8.7.26,13.04,4.15,3.23,2.9,6.2,8.21,4.74,13.04-2.12,7.03-12.5,9.22-19.56,7.7-.55-.12-8.23-1.82-8.3-4.74-.1-4.27,16.08-9.61,31.26-8.89,6.46.31,11.27,1.65,12.74,2.07,55.49,15.82,83.23,23.72,95.7,45.63,4.69,8.24,5.51,20.16,7.14,43.98,0,0,1.06,15.5-1.91,67.4,7.13-.95,13.92-2.07,13.87-2.93-.04-.77-5.64-2.44-9.61-.2-6.51,3.66-2.74,14.47-8.61,25.98-3.42,6.71-8.36,10.2-14.67,14.67-9.32,6.6-19.57,10.47-41.61,14.49-27.43,5-23.27,1.12-65.06,5.79,0,0-28.49,3.18-40.74-5.46-2.46-1.73-4.66-3.29-4.44-3.7.35-.66,7.21,1.03,7.41,3.15.39,4.25-25.96,11.22-49.48,14.04-9.89,1.19-18.55,1.38-35.85,1.78-3.95.09-13.44.28-41.78,0-38.91-.38-38.61-.92-52.15-.44-17.28.6-19.35,1.52-29.78.89-19.93-1.21-21.35-5.12-36.15-5.78-6.51-.29-27.12-.45-48,11.41-2.57,1.46-14.94,8.67-26.37,23.26-11.98,15.3-16.24,30.35-24.74,60.44-5.52,19.55-7.09,30.17-16,46.67-2.7,5-11.65,21.56-15.11,20.3-3.66-1.34-.2-22.25,4-22.67,1.19-.12,1.86,1.47,5.63,3.11,2.23.97,3.8,1.21,4.89,1.48,4.81,1.22,6.78,4.87,10.52,8,4.86,4.07,10.11,5.03,20.59,6.96,5.29.97,9.36,1.17,12.89,1.33,6.72.31,12.57.57,19.26-.74,13.39-2.63,15.13-8.64,23.11-7.11,5.43,1.04,5.94,4.08,12.59,4.89,5.34.65,5.87-1.2,12.89-1.33,8.71-.16,8.6,2.67,16.59,2.07,3.18-.24,7.53-1.02,12.67-1.26,2.25-.11,4.44-.11,4.44-.11.49,0,2.27,0,4.89.11,3.17.14,5.52.35,8.78,0,1.69-.18,2.19-.36,2.56-.78,1.27-1.44.04-4.61,1.11-5.11.29-.13.53.02.78-.2.49-.45.09-1.63,0-1.91-1.13-3.64,3.83-10.33,3.44-17-.03-.44-.09-1.14.33-1.78.44-.66,1.46-1.34,6.33-1.22,4.04.1,4.26.58,5.22.11.89-.44,1.77-1.38,3.11-7.78,1.19-5.69,1.76-8.55.56-9.33-.95-.62-1.68.76-5.44,1.22-1.07.13-1.99.14-5.44.44-.49.04-1.31.12-2.33.44-1.01.32-.99.5-1.67.67-1.66.42-2.36-.48-3.33,0-1.09.54-1.53,2.29-1.11,2.67.3.27.84-.35,2.22-.67,2.06-.48,3.06.37,3.78-.33.77-.76.29-2.43.51-2.45.12-.01.28.51.35.84.21.91-.02,1.34.28,1.67.24.26.65.25.83.25,2.44-.05,4.9.35,7.33.14,5.07-.43,6.04.18,6.83-.83.3-.39.42-.82.13-4.2-.23-2.64-.5-4.61-.98-7.58-.6-3.65-.77-4.22-1.31-4.92-.42-.55-.31-.19-3.28-2.56-.33-.26-1.05-.84-1.97-.83-.46,0-.73.15-.81.19-.45.27-.54.69-.78,1.17-.09.18-.84,1.65-2.06,1.94-.14.03-.78.17-1.39-.14-1.47-.75-1.47-3.39-1.47-3.78,0-1.36.4-1.96-.06-2.5-.37-.44-.79-.25-1.67-.64-.27-.12-1.47-.69-2.08-2-.45-.97-.62-2.4.03-3.39.32-.49.61-.52.83-1.08.34-.86-.1-1.39.25-1.81.38-.45,1.43-.49,1.97-.03.37.31.51,1.11.78,2.69.03.15.14.81.19.81.07,0-.21-1.06.25-1.5.42-.4,1.54-.35,2.03.22.95,1.13-1.12,3.56-.06,4.83.38.46.87.41,1.25,1.11.28.52.33,1.13.36,1.5.06.71-.08.85.06,1.31.18.62.66,1.15.81,1.08.2-.09-.36-1.25-.56-3.28-.11-1.09-.16-1.67,0-2.39.38-1.68,1.43-1.86,1.92-3.31.47-1.37.13-2.99-.61-4.11-1.38-2.1-4-2.22-5.25-2.28-.9-.04-2.47-.11-3.42.92-.11.12-.85.95-.64,1.75.11.42.36.39.58.92.29.69.18,1.52-.19,2.08-.21.31-.32.29-.56.56-.87,1.01-.41,2.73-.36,2.92.05.18.5,1.71,1.86,2.39.88.44,1.33.12,1.81.64.57.62.64,1.85.08,2.39-.09.09-.2.16-.36.22-.98.39-1.94-.16-2.64-.28-1.03-.17-1.89.56-3.39,1.83-3.31,2.81-5.75,6.47-5.75,6.47-.28.42-.56.86-1.06.97-1.27.29-2.86-1.74-4.19-3.44-.92-1.18-2.06-2.16-3.08-3.25-.1-.11-.32-.34-.67-.42-.45-.1-.65.17-1.03.14-.51-.04-.57-.57-1.33-1.31-.3-.29-.85-.6-1.94-1.22-.72-.41-.96-.51-1.06-.42-.23.21.58,1.1.28,1.58-.28.45-1.2,0-1.64.5-.39.44-.1,1.29.11,1.89.2.58.62,1.78,1.83,2.33.3.14,1.04.47,1.75.19.54-.21.48-.56,1.64-1.89.42-.48.8-.87,1.36-1.19.35-.21.86-.44.92-.36.15.22-3.28,2.04-3.03,3.86.05.38.24.63.44.89,2.77,3.57,3.83,4.37,5.08,6.14,1.04,1.46,1.22,2.17,2.17,2.5,1.04.36,2.09-.05,2.61-.25.98-.38,1.74-1.12,3.25-2.58.31-.3.88-.86,1.72-1.61,1.26-1.12,1.55-1.24,1.83-1.19.18.03.53.16,1.36,2.25.53,1.35.91,2.29,1.11,3.69.12.81.14,1.52.11,2.69-.11,4.08-.17,6.12-1.14,7.42-1.12,1.48-1.84.64-3.33,2.33-1.74,1.96-1.16,3.55-3.08,5-.25.19-.08.03-2.22,1.31-1.91,1.14-2.2,1.36-2.5,1.72-.68.82-.68,1.53-1.03,2.97-.06.26-.54,1.6-1.5,4.28-1.94,5.42-3.89,10.09-3.92,11.08,0,.06,0,.28-.13.48-.24.36-.68.32-1,.5-.52.29-.55,1.05-.67,2.06-.22,1.93-.02,2.57-.5,3-.37.33-.89.29-1.22.28-3.12-.15-3.45.67-8.72.22-1.19-.1-2.08-.22-2.19-.66-.08-.33.3-.71.75-1.07,2.23-1.78,4.94-2,4.94-2,2.98-.25,4.33.8,6.17-.28.19-.11.9-.53.83-.89-.07-.38-.97-.51-3.72-.83-2.83-.33-3.32-.35-3.44-.67-.29-.76,2.1-1.72,3.72-3.72,2.28-2.82,1.19-5.44,1.94-10.44.37-2.42,1.23-8.15,5-11.72,2.45-2.33,5.69-2.86,12.06-3.83,8.93-1.36,16.89-.98,16.89-1,0,0-.28-.02-1.06,0-1.71.05-5.49.17-10.06,1.61-2.9.91-4.36,1.37-5.28,2.17-2.44,2.11-1.49,4.14-3.44,11.78-1.08,4.22-1.5,8.61-2.94,12.72-.17.48-.81,2.27-.06,3,.87.84,2.82-.48,4.83.67.04.02.95.55.85.87-.07.24-.64.25-3.08.35-1.47.06-1.69.07-2.06.22-.82.34-.78.7-1.78,1.17-.89.42-1.29.29-1.61.72-.33.44-.33,1.12-.17,1.5.52,1.23,3.32.82,8.34.83,4.85.02,8.47.43,8.89-.83.17-.52-.31-.97,0-1.39.56-.76,2.4.37,3.49-.38.77-.53.74-1.72.74-3.12-.03-6.8-.05-10.2,0-10.89,0,0,.25-3.6-.44-3.72-.13-.02-.31.11-.56.03-.25-.08-.4-.32-.5-.53-.4-.83-.39-1.93-.39-2.33.01-1.37.02-2.05.11-2.17.61-.8,2.17-.11,4.65.03,3.07.18,6.01-.56,6.02-1.03,0-.38-1.88-.69-2.72-.83-1.57-.26-2.79-.28-5-.22-4.97.12-6.28.37-7.11.56-1.27.29-3.04.81-3,1.06.03.16.85.16,2.28.11,5.82-.2,7.73-.68,8.3.25.32.51-.26.7-.2,2.75.02.92.16,1.7-.32,2.11-.23.2-.4.14-.67.28-.83.43-.9,1.88-.93,2.37-.21,4.3.37,8.61.15,12.91-.03.51-.13,2.12.66,2.55.23.13.36.05,1.23.06,1.28.02,1.92.02,2.17.39.27.4-.15.84.17,1.39,0,0,.2.34.74.55,6.78,2.59,63.9-5.99,63.9-5.99,4.85-.73,12.29-1.03,27.19-1.63,74.47-3.01,138.11,14.9,160.96,21.33,3.21.9,9.45,2.7,17.48,5.48,26.46,9.18,43.54,15.1,58.37,29.63,4.79,4.69,16.59,16.54,21.78,36,1.83,6.84,6.13,22.97-.81,40.52-10.72,27.08-39.85,36.37-43.78,37.56-2.57.78-3.45.85-8,2.22-15.59,4.71-24.91,9.8-32,12.89-7.88,3.43-17.03,5.1-35.33,8.44,0,0-38.53,7.03-63.99,1.46-3.39-.74-5.3-1.68-6.68-2.57-5.14-3.3-5-7.1-10-12.22-3.71-3.8-4.44-2.38-9.78-6.89-7.81-6.6-7.48-10.69-10.67-10.89-5.7-.35-6.94,12.72-20,20-.18.1-.14.08-8,3.33-17.32,7.18-17.96,7.48-19.78,8-9.98,2.85-21.92,2.69-22.67,0-.56-2.01,5.49-4.14,20.89-15.56,10.42-7.72,12.69-10.49,13.88-14.19,1-3.12,1.61-8.09,3.45-8.25.56-.05,1.49.63,3.33,2,1.16.86,2.03,1.61,2.22,1.78,2.87,2.58,6.43,13.28,8.22,17.33.27.6,5.17,11.31,15.56,15.11,5.16,1.89,12.13,2.25,13.11,0,1.26-2.89-8.84-6.67-17.56-20-4.06-6.22-3.42-7.78-7.33-11.78-5.77-5.89-9.78-5.17-14-10.89-4.27-5.78-4.15-11.9-5.56-11.78-1.15.1-.88,4.12-2.67,9.11-1.08,3.02-2.66,5.69-11.33,14.89-7.36,7.8-12.02,12.75-12.67,12.22-.7-.56,3.12-7.6,8.67-13.78,6.25-6.96,9.08-6.6,12.22-12,4.25-7.29,3.63-15.75,2.67-16-.52-.13-.82,2.23-3.34,4.66-2.77,2.67-4.47,1.8-7.1,4.23-.86.79-1.99,2.91-4.22,7.11-2.32,4.36-3.19,6.33-4.22,6.22-1.05-.11-.94-2.23-2-2.67-2.6-1.06-7.1,10.21-15.56,17.78-7.2,6.44-10.11,3.8-27.11,12.44-11.6,5.9-19.45,11.81-19.33,12,.08.13,3.87-2.34,10-4.67,4.46-1.69,6.69-2.54,9.56-2.44,4.08.13,5.07,1.89,10.67,3.78,4.9,1.65,12.46,3.12,13.33,1.33.73-1.5-3.92-3.99-11.11-11.56-7.87-8.28-8.19-11.51-11.78-12-5.28-.72-8.31,5.76-16.44,12.22-7.37,5.86-14.13,7.89-24.89,11.11-5.79,1.74-16.52,4.38-44.67,3.78-19.81-.42-20.21-1.85-35.11-2.22-1.92-.05-3.67-.07-5.59-.05-9.47.14-46.41,4.33-55.88,5.41-1.39.16-1.53.17-1.6.18-.02,0-.03,0-.03,0-6.8.87-14.44-2-14.44-2-5.56-2.09-20.21-4.93-28-.89-10.74,5.58-10.61,25.38-10.44,30.67"
				/>
			</svg>
		</div>
	)
}
