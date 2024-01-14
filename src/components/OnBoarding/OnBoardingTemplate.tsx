import { Canvas } from '@react-three/fiber'
import ThreeTest from './ThreeTest'
import { useEffect } from 'react'

export default function OnBoardingTemplate() {
	const images: string[] = [
		'onBoarding1',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
	]

	useEffect(() => {
		const div = document.querySelectorAll('div')
		const observer = new IntersectionObserver(() => {})
		observer.observe(div[8])
		observer.observe(div[9])
		observer.observe(div[11])
	}, [])

	// observer.observe(div)

	return (
		<div className="w-full overflow-x-hidden">
			<div className="z-10 fixed w-full h-full">
				<Canvas>
					<ThreeTest />
				</Canvas>
			</div>
			<section className="w-full h-fit flex-col justify-center bg-gradient-to-b from-[#ffffff] to-[#7Ac1eD]">
				<div id="box" className="h-screen mb-4"></div>
				<div className="bg-[#000] h-screen p-20">
					<div className="f-full h-full bg-gradient-to-b from-[#c7d] to-[#7Ac1eD]"></div>
				</div>
				<div className="w-full h-screen">
					<div className="flex flex-row-reverse gap-[10px] mt-32 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
					<div className="flex flex-row gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
					<div className="flex flex-row-reverse gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
