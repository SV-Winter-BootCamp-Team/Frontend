import { useNavigate, useParams } from 'react-router-dom'
import CanvasPreview from '../components/MainPage/CanvasPreview'
import { useEffect, useState } from 'react'
import axios from 'axios'
import plus from '/images/svg/plus.svg'

export type CanvasPreviewProps = {
	canvas_id: number
	canvas_preview_url: string
	canvas_name: string
	update_at: string
}

export type AddCanvasType = {
	[index: string]: string | number
	canvas_name: string
	owner_id: number
}

export default function MainPage() {
	const nav = useNavigate()
	const { user_id } = useParams()
	const [personalCanvasData, setPersonalCanvasData] = useState<
		CanvasPreviewProps[]
	>([])
	const [shareCanvasData, setShareCanvasData] = useState<CanvasPreviewProps[]>(
		[],
	)
	const [newCanvas, setNewCanvas] = useState<AddCanvasType>({
		canvas_name: 'Untitled',
		owner_id: Number(user_id),
	})

	console.log(import.meta.env.DEV ? '개발' : '배포')
	console.log(import.meta.env.VITE_BASE_URL)
	console.log(import.meta.env.VITE_SOCKET_URL)

	function createPersonalCanvas() {
		setNewCanvas((current) => {
			let nextState = current
			nextState['canvas_name'] = 'Untitled'
			return nextState
		})
		axios
			.post(`${import.meta.env.VITE_BASE_URL}canvases/`, newCanvas)
			.then(() => {
				window.location.reload()
			})
			.catch((error) => {
				alert(error.response.message)
			})
	}

	useEffect(() => {
		axios
			.get(
				`${import.meta.env.VITE_BASE_URL}canvases/personal/${Number(user_id)}/`,
			)
			.then((response) => {
				const loadedCanvas = response.data.result.canvases
				loadedCanvas.forEach((item: CanvasPreviewProps) => {
					item['update_at'] = item['update_at'].substr(0, 19).replace('T', ' ')
				})
				setPersonalCanvasData(loadedCanvas)
			})
			.catch(() => {})
		axios
			.get(`${import.meta.env.VITE_BASE_URL}canvases/share/${Number(user_id)}/`)
			.then((response) => {
				const loadedCanvas = response.data.result.canvases
				loadedCanvas.forEach((item: CanvasPreviewProps) => {
					item['update_at'] = item['update_at'].substr(0, 19).replace('T', ' ')
				})
				setShareCanvasData(loadedCanvas)
			})
			.catch(() => {})
	}, [])

	return (
		<div className="w-screen max-w-full overflow-x-hidden">
			<header className="z-10 fixed top w-full h-[70px] flex justify-between text-white bg-[#fff] px-[30px] py-[15px] border-gray-200 border-b-[1px]">
				<div
					className="font-jua text-[#60c0d0] text-4xl cursor-pointer"
					onClick={() => {
						nav({
							pathname: '/',
						})
					}}
				>
					꾸며Zoom
				</div>
				<div>
					<div className="flex font-sans font-normal text-white">
						<button
							className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white"
							onClick={() => {
								localStorage.clear()
								nav({
									pathname: '/',
								})
							}}
						>
							로그아웃
						</button>
					</div>
				</div>
			</header>
			<h1 className="mt-[70px] mx-8 mt-8 text-xl font-medium">내 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{personalCanvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
				<div>
					<div
						className="relative bg-[#66CAE150] cursor-pointer px-32 py-20 border-2 sm:py-[100px] rounded-lg"
						onClick={createPersonalCanvas}
					>
						<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white">
							<img className="w-5 h-5" src={plus} />
						</div>
					</div>
				</div>
			</div>
			<hr className="mx-10 mt-12" />
			<h1 className="mx-8 mt-8 text-xl font-medium">공유된 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{shareCanvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
			</div>
		</div>
	)
}
