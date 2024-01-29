import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import ThreeTest from './ThreeTest'
import lottie from 'lottie-web'
import webSocketJson from '../../animations/json/webSocket.json'
import startJson from '../../animations/json/startImage.json'
import { useNavigate } from 'react-router-dom'
import PathDrawing from './PathDrawing'
import aiImage from '/images/svg/aiImage.svg'
import ImageSlider from './ImageSlider'

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
					<div className="absolute right-0 h-full w-3/5 font-medium text-5xl">
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
					<div className="absolute left-0 h-full w-3/5 font-medium text-5xl">
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
				<div className="relative w-full h-fit bg-white pt-[8%] overflow-hidden">
					<div className="flex h-fit justify-center gap-16 items-center text-[130px] text-[#66CAE1]">
						[
						<div className="text-black h-fit flex flex-col gap-4">
							<h1 className="text-4xl w-full flex justify-center font-semibold pt-8">
								제한 없이 표현할 수 있는
							</h1>
							<h1 className="text-4xl w-full flex justify-center font-semibold">
								자유로운 공간
							</h1>
							<h1 className="w-full flex justify-center text-xl text-gray-400">
								당신의 창의력을 디자인에 녹여내보세요
							</h1>
						</div>
						]
					</div>
					<ImageSlider />
				</div>
				<div className="relative h-[180vh] pt-16">
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<div className="flex flex-col gap-4 justify-center text-xl font-semibold">
							<h2 className="text-3xl mb-2">작업을 도와주는 AI</h2>
							<div>상상만 하던 것을 표현하도록 도움을 줄게요</div>
							<div>창작에 날개를 달아드립니다!</div>
						</div>
						<img className="w-[35%]" alt="aiImage" src={aiImage} />
					</div>
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<div id="webSocket" className="h-full bg-white" />
						<div className="flex flex-col gap-4 items-end text-xl font-semibold">
							<h2 className="text-3xl mb-2">실시간 공유 캔버스</h2>
							<div>친구를 초대하고, 같이 디자인 해보세요</div>
							<div>혼자 하는것 보다 재미있을 거에요</div>
						</div>
					</div>
					<div className="h-[50vh] w-full flex justify-between items-center px-44">
						<div className="flex flex-col gap-4 justify-center text-xl font-semibold">
							<h2 className="text-3xl mb-2">바로 시작하기</h2>
							<div>회원가입만 하면 웹 상에서 바로 시작 할 수 있습니다</div>
							<div>지금 바로 시작해보세요</div>
						</div>
						<div className="w-[50%] h-full pt-32 flex justify-between">
							<div id="startImage" className="h-full bg-white" />
							<button
								className="px-4 pt-2 pb-1 h-fit text-2xl text-white font-jua rounded-lg bg-[#66CAE1]"
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
					<div className="absolute top-0 w-full">
						<PathDrawing />
					</div>
				</div>
			</section>
		</div>
	)
}
