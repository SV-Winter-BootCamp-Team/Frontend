import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
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
		{
			key: 1,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 8,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 9,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
		{
			key: 10,
			src: 'src/components/OnBoarding/background2.png',
			alt: 'onBoarding2',
		},
	]
	const [handleThree, setHandleThree] = useState<HandleThreeType>({
		color: '#80B9BF',
		mouseX: 0,
		x: 0,
	})
	const [mousex, setMousex] = useState(0)

	const handleMouseMove = (e: React.MouseEvent) => {
		const x = e.clientX / window.innerWidth
		setMousex(1 / (1 + Math.exp(-23 * (x - 0.5))))

		const red = Math.round(212 - 110 * (1 - x))
		const green = Math.round(212 + 18 * (1 - x))
		const blue = Math.round(212 + 43 * (1 - x))

		const color = `rgb(${red}, ${green}, ${blue})`

		setHandleThree({
			color: color,
			mouseX: e.clientX,
			x: mousex,
		})
	}

	return (
		<div className="w-full overflow-hidden">
			<section className="w-full h-fit flex-col ">
				<div className="w-full h-screen flex justify-center">
					<Canvas shadows>
						<ThreeTest {...handleThree} />
					</Canvas>
					<div className="absolute right-0 h-full w-3/5 font-jua text-5xl">
						<div
							style={{
								width: '100%',
								height: '300px',
								position: 'absolute',
								top: `${(0.4 - mousex) * window.innerHeight}px`,
								opacity: 0.8 - mousex * 2,
							}}
						>
							<div className="flex flex-col items-center mx-20 h-80 justify-center">
								<p>AI를 활용한 '나'를</p>
								<p>표현하는 배경 만들기!</p>
							</div>
						</div>
					</div>
					<div className="absolute left-0 h-full w-3/5 font-jua text-5xl">
						<div
							style={{
								width: '100%',
								height: '300px',
								position: 'absolute',
								top: `${(mousex - 0.6) * window.innerHeight}px`,
								opacity: mousex * 2 - 1.2,
							}}
						>
							<div className="flex flex-col items-center mx-20 h-80 justify-center">
								<p>지루한 회의...</p>
								<p>재미없는 시간...</p>
							</div>
						</div>
					</div>
					<div
						className="absolute h-full w-full"
						onMouseMove={handleMouseMove}
					/>
				</div>
				<div className={`w-full h-screen bg-white`}>
					<div className="flex flex-row-reverse gap-[10px] pt-40 overflow-hidden">
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
