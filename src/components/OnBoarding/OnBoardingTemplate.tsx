import { useState } from 'react'
import ThreeTest from './ThreeTest'

export type ImageType = {
	key: number
	src: string
	alt: string
}

export type HandleThreeType = {
	color: string
	mouseX: number
	x: number
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
	const [handleThree, setHandleThree] = useState<HandleThreeType>({
		color: '#3490dc',
		mouseX: 0,
		x: 0,
	})
	const [mousex, setMousex] = useState(0)

	const handleMouseMove = (e: React.MouseEvent) => {
		const x = e.clientX / window.innerWidth
		setMousex(x)

		const red = Math.round(212 - 128 * x)
		const green = Math.round(212 - 40 * x)
		const blue = Math.round(212 - 24 * x)

		const color = `rgb(${red}, ${green}, ${blue})`

		setHandleThree({
			color: color,
			mouseX: e.clientX,
			x: x,
		})
	}

	return (
		<div className="w-full overflow-hidden">
			<section className="w-full h-fit flex-col ">
				<div className="w-full h-full flex justify-center">
					<ThreeTest {...handleThree} />
					<div className="absolute right-0 h-full w-1/3 font-jua text-5xl">
						<div
							style={{
								width: '100%',
								height: '300px',
								position: 'absolute',
								top: `${(0.5 - mousex) * window.innerHeight}px`,
								opacity: 0.8 - mousex * 2,
							}}
						>
							<div className="flex flex-col items-center">
								<p>지루한 회의...</p>
								<p>재미없는 시간...</p>
							</div>
						</div>
					</div>
					<div className="absolute left-0 h-full w-1/3 font-jua text-5xl">
						<div
							style={{
								width: '100%',
								height: '300px',
								position: 'absolute',
								top: `${(mousex - 0.5) * window.innerHeight}px`,
								opacity: mousex * 2 - 1.2,
							}}
						>
							<div className="flex flex-col items-center">
								<p>AI를 활용한 '나'를</p>
								<p>표현하는 배경 만들기!</p>
							</div>
						</div>
					</div>
					<div
						className="absolute h-full w-full"
						onMouseMove={handleMouseMove}
					/>
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
