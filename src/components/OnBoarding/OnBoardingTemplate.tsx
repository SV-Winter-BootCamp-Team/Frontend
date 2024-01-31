import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ThreeTest from './ThreeTest'
import webSocketImage from '/images/png/websocketImage.png'
import startImage from '/images/png/startImage.png'
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
					<div className="absolute right-0 h-full w-3/5 font-medium text-[3vw]">
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
					<div className="absolute left-0 h-full w-3/5 font-medium text-[3vw]">
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
					<div className="flex h-fit justify-center gap-[3vw] items-center text-[13vw] text-[#66CAE1]">
						[
						<div className="text-black h-fit flex flex-col gap-[0.3vw]">
							<h1 className="text-[3.5vw] w-full flex justify-center font-semibold pt-8">
								함께 표현하는 자유로운 공간
							</h1>
							<h1 className="w-full flex justify-center text-[1.5vw] text-gray-400">
								당신의 창의력을 디자인에 녹여내보세요
							</h1>
						</div>
						]
					</div>
					<ImageSlider />
				</div>
				<div className="relative w-full aspect-[595.28/640.48]">
					<div className="aspect-[595.28/213.49] w-full flex justify-between items-end px-[10vw]">
						<div className="flex flex-col gap-4 items-start text-[1.6vw] font-semibold pb-[4vw]">
							<h2 className="text-[3.2vw] mb-2">작업을 도와주는 AI</h2>
							<div>여러분의 상상력을 표현할 수 있게 도움을 드립니다. </div>
							<div>창작에 날개를 달아드립니다!</div>
						</div>
						<img className="w-[35%]" alt="aiImage" src={aiImage} />
					</div>
					<div className="aspect-[595.28/213.49] w-full flex justify-between items-end px-[8vw]">
						<img className="w-[39vw]" src={webSocketImage} />
						<div className="flex flex-col gap-4 items-end text-[1.6vw] font-semibold pb-[4vw]">
							<h2 className="text-[3.2vw] mb-2">실시간 공유 캔버스</h2>
							<div>친구를 초대하고, 같이 디자인 해보세요</div>
							<div>혼자 하는것 보다 재미있을 거에요</div>
						</div>
					</div>
					<div className="aspect-[595.28/213.49] w-full flex justify-between items-center px-[10vw]">
						<div className="flex flex-col gap-4 justify-center text-[1.6vw] font-semibold">
							<h2 className="text-[3.2vw] mb-2">바로 시작하기</h2>
							<div>회원가입까지 걸리는 시간 ONLY 3초!</div>
							<div>지금 바로 시작해보세요</div>
						</div>
						<div className="w-[34vw] h-full pt-32 flex justify-between">
							<img className="w-[20vw] h-fit" src={startImage} />
							<button
								className="z-20 mr-4 px-3 pt-1 pb-[2px] h-fit text-[2vw] text-white font-jua rounded-lg bg-[#66CAE1] hover:bg-cyan-100 hover:text-[#66CAD1] active:bg-cyan-50"
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
				<div className="h-[8vw] x-full " />
			</section>
		</div>
	)
}
