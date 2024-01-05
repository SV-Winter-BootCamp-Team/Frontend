import { Link, useParams } from 'react-router-dom'
import CanvasPreview from '../components/CanvasPreview'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export type CanvasPreviewProps = {
	canvas_id: number
	content: string
	canvas_name: string
	update_at: string
}

export default function MainPage() {
	const user_id = useParams()
	const [canvasData, setCanvasData] = useState<CanvasPreviewProps[]>([])

	// TODO: fetch user data from server

	const response = {
		message: '개인 캔버스 전체 조회 성공',
		result: {
			canvases: [
				{
					canvas_id: 1,
					content: 'test',
					canvas_name: 'Untitled',
					update_at: '2023-01-05',
				},
				{
					canvas_id: 2,
					content: 'test2',
					canvas_name: 'Untitled2',
					update_at: '2023-01-06',
				},
				{
					canvas_id: 3,
					content: 'test3',
					canvas_name: 'Untitled3',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 4,
					content: 'test4',
					canvas_name: 'Untitled4',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 5,
					content: 'test5',
					canvas_name: 'Untitled5',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 6,
					content: 'test6',
					canvas_name: 'Untitled6',
					update_at: '2023-01-07',
				},
			],
		},
	}

	useEffect(() => {
		setCanvasData(response.result.canvases)
	}, [])

	console.log(canvasData)

	return (
		<>
			<NavBar />
			<h1 className="mx-8 mt-8 text-xl font-semibold">내 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{canvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
				<Link to="/canvas" className="flex-col">
					<div className="bg-purple-100 flex justify-center px-32 py-32 border-2 sm:py-[100px]">
						<p>+</p>
					</div>
				</Link>
			</div>
			<h1 className="mx-8 mt-8 text-xl font-semibold">공유된 캔버스</h1>
			<div className="grid grid-cols-1 gap-8 mx-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{canvasData.map((canvas: CanvasPreviewProps) => (
					<CanvasPreview key={canvas.canvas_id} {...canvas} />
				))}
				<Link to="/canvas" className="flex-col">
					<div className="bg-purple-100 flex justify-center px-32 py-32 border-2 sm:py-[100px]">
						<p>+</p>
					</div>
				</Link>
			</div>
		</>
	)
}
