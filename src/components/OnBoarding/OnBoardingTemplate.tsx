import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import ThreeTest from './ThreeTest'
import lottie from 'lottie-web'
import webSocketJson from '../../animations/json/webSocket.json'
import startJson from '../../animations/json/startImage.json'
import { useNavigate } from 'react-router-dom'
import PathDrawing from './PathDrawing'

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
	const nav = useNavigate()
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
	const webSocketImage = document.querySelector('#webSocket')!
	const startImage = document.querySelector('#startImage')!

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

	useEffect(() => {
		{
			lottie.loadAnimation({
				container: webSocketImage,
				loop: true,
				autoplay: true,
				animationData: webSocketJson,
			})
		}
		return () => {
			lottie
				.loadAnimation({
					container: webSocketImage,
				})
				.destroy()
		}
	}, [])
	useEffect(() => {
		{
			lottie.loadAnimation({
				container: startImage,
				loop: true,
				autoplay: true,
				animationData: startJson,
			})
		}
		return () => {
			lottie
				.loadAnimation({
					container: startImage,
				})
				.destroy()
		}
	}, [])

	return (
		<div className="w-full overflow-hidden">
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
				<div className="relative w-full h-screen bg-white pt-[5%] overflow-hidden">
					<div className="flex h-fit justify-center gap-16 items-center text-[130px] text-[#66CAE1]">
						[
						<div className="text-black h-fit flex flex-col font-jua gap-4">
							<h1 className="text-4xl w-full flex justify-center font-semibold pt-8">
								함께 표현하는 자유로운 공간
							</h1>
							<h1 className="w-full flex justify-center text-xl text-gray-400">
								당신의 창의력을 디자인에 녹여내보세요
							</h1>
						</div>
						]
					</div>
					<div className="flex flex-row-reverse gap-[1%] mt-[3%] overflow-hidden">
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
				<div className="relative h-[190vh]">
					<div className="h-[60vh] w-full flex justify-between items-center px-[10%]">
						<div className="flex flex-col gap-4 justify-center font-jua">
							<h2 className="text-5xl mb-2">작업을 도와주는 AI</h2>
							<div className=" text-[24px] font-thin">
								여러분의 상상력을 표현할 수 있게 도움을 드립니다.
							</div>
							<div className=" text-[24px] font-thin">
								창작에 날개를 달아드립니다!
							</div>
						</div>
						<img
							className="w-[45%]"
							alt="aiImage"
							src="public/images/svg/aiImage.svg"
						/>
					</div>
					<div className="h-[60vh] w-full flex justify-between items-center px-[10%]">
						<div id="webSocket" className="h-full bg-white" />
						<div className="flex flex-col gap-4 items-end font-jua">
							<h2 className="text-5xl mb-2">실시간 공유 캔버스</h2>
							<div className=" text-[24px] font-thin">
								친구를 초대하고, 같이 디자인 해보세요
							</div>
							<div className=" text-[24px] font-thin">
								혼자 하는것 보다 재미있을 거에요
							</div>
						</div>
					</div>
					<div className="h-[70vh] w-full flex justify-between items-center px-[10%]">
						<div className="flex flex-col gap-4 justify-center font-jua">
							<h2 className="text-5xl mb-2">바로 시작하기</h2>
							<div className=" text-[24px] font-thin">
								회원가입까지 걸리는 시간 ONLY 3초!
							</div>
							<div className=" text-[24px] font-thin">
								지금 바로 시작해보세요
							</div>
						</div>
						<div className="relative w-[55%] h-full flex justify-between overflow-hidden">
							<div id="startImage" className="absolute h-full bg-white" />
							<button
								className="absolute right-0 top-32 px-4 pt-2 pb-1 h-fit text-2xl text-white font-jua rounded-lg bg-[#66CAE1]"
								onClick={() => {
									nav({
										pathname: '/signup/',
									})
								}}
							>
								시작하기
							</button>
						</div>
					</div>
					<div
						id="content"
						className="absolute top-[-3.5%] w-full h-[400vh] bg-gray-400"
					>
						<PathDrawing />
					</div>
				</div>
			</section>
		</div>
	)
}
