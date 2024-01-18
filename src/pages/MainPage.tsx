import { useParams } from 'react-router-dom'
import CanvasPreview from '../components/MainPage/CanvasPreview'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'

export type CanvasPreviewProps = {
	canvas_id: number
	content: string
	canvas_name: string
	update_at: string
}

export type AddCanvasType = {
	[index: string]: string | number
	canvas_name: string
	owner_id: number
}

export default function MainPage() {
	const { user_id } = useParams()
	const [personalCanvasData, setPersonalCanvasData] = useState<
		CanvasPreviewProps[]
	>([])
	const [shareCanvasData, setShareCanvasData] = useState<CanvasPreviewProps[]>(
		[],
	)
	const [newCanvas, setNewCanvas] = useState<AddCanvasType>({
		canvas_name: '',
		owner_id: Number(user_id),
	})

	function createPersonalCanvas() {
		setNewCanvas((current) => {
			let nextState = current
			nextState['canvas_name'] = 'Untitled'
			return nextState
		})
		axios
			.post('http://localhost:8000/api/v1/canvases/', newCanvas)
			.then(() => {
				window.location.reload()
			})
			.catch((error) => {
				alert(error.response.message)
			})
	}

	function onClick() {
		setNewCanvas((current) => {
			let nextState = current
			nextState['canvas_name'] = 'Untitled'
			return nextState
		})
		axios
			.post('http://localhost:8000/api/v1/canvases/', newCanvas)
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error.response.message)
			})
	}

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/v1/canvases/personal/${Number(user_id)}/`)
			.then((response) => {
				const loadedCanvas = response.data.result.canvases
				loadedCanvas.forEach((item: CanvasPreviewProps) => {
					item['update_at'] = item['update_at'].substr(0, 19).replace('T', ' ')
				})
				setPersonalCanvasData(loadedCanvas)
			})
			.catch(() => {})
		axios
			.get(`http://localhost:8000/api/v1/canvases/share/${Number(user_id)}/`)
			.then((response) => {
				const loadedCanvas = response.data.result.canvases
				loadedCanvas.forEach((item: CanvasPreviewProps) => {
					item['update_at'] = item['update_at'].substr(0, 19).replace('T', ' ')
				})
				setShareCanvasData(response.data.result.canvases)
			})
			.catch(() => {})
	}, [])

	return (
		<>
			<NavBar />
			<h1 className="mx-8 mt-8 text-xl font-semibold">내 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{personalCanvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
				<div>
					<div
						className="bg-purple-100 cursor-pointer flex justify-center px-32 py-20 border-2 sm:py-[100px]"
						onClick={createPersonalCanvas}
					>
						<p className="absolute">+</p>
					</div>
				</div>
			</div>
			<h1 className="mx-8 mt-8 text-xl font-semibold">공유된 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{shareCanvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
			</div>
		</>
	)
}
