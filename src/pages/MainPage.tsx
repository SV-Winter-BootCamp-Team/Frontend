import { useNavigate, useParams } from 'react-router-dom'
import CanvasPreview from '../components/MainPage/CanvasPreview'
import { useEffect, useState } from 'react'
import axios from 'axios'
import plus from '/images/svg/plus.svg'
import NavBar from '../components/General/NavBar'
import { ButtonProps } from '../components/General/NavBar/Button'

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

	const buttons: ButtonProps[] = [
		{
			text: '로그아웃',
			handleClickButton: () => {
				localStorage.clear()
				nav({
					pathname: '/',
				})
			},
			hoverBackgroundColor: 'hover:bg-[#fff]',
			activeBackgroundColor: 'active:bg-[#f8f5f5]',
			hoverTextColor: 'hover:text-[#60c0d0]',
		},
	]

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
			<NavBar
				buttons={buttons}
				backgroundColor="bg-[#60c0d0]"
				textColor="text-[#fff]"
			/>
			<h1 className="mt-[40px] mx-8 text-xl font-medium">내 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{personalCanvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
				<div>
					<div
						className="relative bg-[#66CAE150] cursor-pointer px-32 py-20 border-2 sm:py-[100px] rounded-lg"
						onClick={createPersonalCanvas}
					>
						<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white hover:bg-gray-100 active:bg-gray-200">
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
