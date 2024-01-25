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
	x: number
}

export default function OnBoardingTemplate() {
	const images1: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example01.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example02.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example03.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example04.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example05.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example06.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example07.svg',
			alt: 'onBoarding2',
		},
	]
	const images2: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example11.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example12.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example13.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example14.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example15.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example16.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example17.svg',
			alt: 'onBoarding2',
		},
	]
	const images3: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example21.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example22.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example23.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example24.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example25.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example26.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example27.svg',
			alt: 'onBoarding2',
		},
	]
	const [handleThree, setHandleThree] = useState<HandleThreeType>({
		color: '#80B9BF',
		x: 0,
	})
	const [mousex, setMousex] = useState(0)

	const handleMouseMove = (e: React.MouseEvent) => {
		const x = e.clientX / window.innerWidth
		setMousex(1 / (1 + Math.exp(-35 * (x - 0.5))))

		const red = Math.round(212 - 110 * (1 - x))
		const green = Math.round(212 + 18 * (1 - x))
		const blue = Math.round(212 + 43 * (1 - x))

		const color = `rgb(${red}, ${green}, ${blue})`

		setHandleThree({
			color: color,
			x: mousex,
		})
	}
	// const content1 = document.querySelector('#content1')
	// const path1 = document.querySelector('.path2')
	// const path1Length = path1.getTotalLength()
	// path1.style.strokeDasharray = path1Length + ' ' + path1Length
	// path1.style.strokeDashoffset = calcDashoffset(
	// 	window.innerHeight * 0.8,
	// 	content1,
	// 	path1Length,
	// )

	// function calcDashoffset(scrollY, element, length) {
	// 	const ratio = (scrollY - element.offsetTop) / element.offsetHeight
	// 	const value = length - length * ratio
	// 	return value < 0 ? 0 : value > length ? length : value
	// }

	// function scrollHandler() {
	// 	const scrollY = window.scrollY + window.innerHeight * 0.8
	// 	path1.style.strokeDashoffset = calcDashoffset(
	// 		scrollY,
	// 		content1,
	// 		path1Length,
	// 	)
	// }

	// window.addEventListener('scroll', scrollHandler)

	return (
		<div className="w-full overflow-hidden">
			<div id="content1"></div>
			<section className="w-full h-fit flex-col ">
				<div className="w-full h-screen flex justify-center">
					<Canvas shadows>
						<ThreeTest {...handleThree} />
					</Canvas>
					<div className="absolute bottom-5 h-3 w-7 flex justify-between items-center">
						<div
							className="bg-gray-600 aspect-square rounded-full"
							style={{
								height: `${6 + (1 - mousex) * 6}px`,
							}}
						/>
						<div
							className="absolute bg-gray-600 rounded-full"
							style={{
								height: `${12 - mousex * (1 - mousex) * 24}px`,
								width: `${12 + mousex * (1 - mousex) * 12}px`,
								left: `${mousex * 60}%`,
							}}
						/>
						<div
							className="bg-gray-600 aspect-square rounded-full"
							style={{
								height: `${6 + mousex * 6}px`,
							}}
						/>
					</div>
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
				<div className="relative w-full h-screen bg-white overflow-hidden">
					<div className="absolute top-[-5%] left-[10%] w-[40%] aspect-square rounded-full bg-[#66CAE166]" />
					<div className="absolute top-[-13%] left-[4%] w-[45%] aspect-square rounded-full border-[#66CAE1] border-2" />
					<div className="absolute top-[38%] right-[-47%] w-[95%] aspect-square rounded-full border-[#66CAE1] border-2" />
					<h1 className="absolute top-[10%] text-6xl w-full flex justify-center font-semibold">
						꾸며Zoom에서만 할 수 있는 작업
					</h1>
					<h1 className="absolute top-[20%] w-full flex justify-center text-2xl">
						당신의 창의력을 디자인에 녹여내보세요
					</h1>
					<div className="flex flex-row-reverse gap-[1%] mt-[15%] overflow-hidden">
						{images1.map((image) => (
							<img
								className="w-[15%] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images1.map((image) => (
							<img
								className="w-[15%] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
					<div className="flex flex-row gap-[1%] mt-4 overflow-hidden">
						{images2.map((image) => (
							<img
								className="w-[15%] animate-reverse_slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images2.map((image) => (
							<img
								className="w-[15%] animate-reverse_slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
					<div className="flex flex-row-reverse gap-[1%] mt-4 overflow-hidden">
						{images3.map((image) => (
							<img
								className="w-[15%] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
						{images3.map((image) => (
							<img
								className="w-[15%] animate-slider"
								key={image.key}
								alt={image.alt}
								src={image.src}
							/>
						))}
					</div>
				</div>
				<div className="h-[180vh] pt-[18%]">
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<div className="flex flex-col gap-4 justify-center text-xl font-semibold">
							<h2 className="text-3xl mb-2">작업을 도와주는 AI</h2>
							<div>상상만 하던 것을 표현하도록 도움을 줄게요</div>
							<div>창작에 날개를 달아드립니다!</div>
						</div>
						<img
							className="w-[35%]"
							alt="aiImage"
							src="public/images/svg/aiImage.svg"
						/>
					</div>
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<img
							className="w-[35%]"
							alt="webSocketImage"
							src="public/images/svg/webSocketImage.svg"
						/>
						<div className="flex flex-col gap-4 items-end text-xl font-semibold">
							<h2 className="text-3xl mb-2">실시간 공유 캔버스</h2>
							<div>친구를 초대하고, 같이 디자인 해보세요</div>
							<div></div>
						</div>
					</div>
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<div className="flex flex-col gap-4 justify-center text-xl font-semibold">
							<h2 className="text-3xl mb-2">바로 시작하기</h2>
							<div>회원가입만 하면 웹 상에서 바로 시작 할 수 있습니다</div>
							<div>지금 바로 시작해보세요</div>
						</div>
						<div className="w-[35%] h-full pt-32 flex justify-between">
							<img
								className="w-[35%] rotate-[-13deg]"
								alt="startImage"
								src="public/images/svg/startImage.svg"
							/>
							<button
								className="px-4 pt-2 pb-1 h-fit text-4xl text-white font-jua rounded-lg bg-[#66CAE1]"
								onClick={() => {
									window.location.replace('/signup')
								}}
							>
								시작하기
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
