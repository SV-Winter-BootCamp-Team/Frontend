import { useState } from 'react'
import ThreeTest from './ThreeTest'

export type ImageType = {
	key: number
	src: string
	alt: string
}

export default function OnBoardingTemplate() {
	const images: ImageType[] = [
		{ key: 1, src: 'public/images/svg/onBoarding1.svg', alt: 'onBoarding1' },
		{ key: 2, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 3, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 4, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 5, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 6, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 7, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 8, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 9, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
		{ key: 10, src: 'public/images/svg/onBoarding2.svg', alt: 'onBoarding2' },
	]
	const [backgroundColor, setBackgroundColor] = useState('#3490dc') // 초기 배경 색상

	const handleMouseMove = (e: React.MouseEvent) => {
		const x = e.clientX / window.innerWidth

		const red = Math.round(7.5 * x + 77.75)
		const green = Math.round(139.5 * x + 55.75)
		const blue = Math.round(163.5 * x + 51.75)

		setBackgroundColor(`rgb(${red}, ${green}, ${blue})`)
	}

	return (
		<div className="w-full overflow-hidden">
			<section className="w-full h-fit flex-col ">
				<div
					className="w-screen h-screen flex justify-center"
					style={{ backgroundColor }}
				>
					<div
						className="absolute h-full w-2/3"
						onMouseMove={handleMouseMove}
					></div>
					<ThreeTest color={backgroundColor} />
				</div>
				<div
					className={`w-full h-screen bg-gradient-to-b from-[#54ACBC] to-[#96D9E6]`}
				>
					<div className="flex flex-row-reverse gap-[10px] pt-80 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
					<div className="flex flex-row gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
					<div className="flex flex-row-reverse gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
