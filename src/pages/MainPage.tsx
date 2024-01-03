import { useParams } from 'react-router-dom'
import Canvas from '../components/Canvas'
import { useEffect, useState } from 'react'

export type CanvasDataType = {
	canvas_id: number
	canvas_name: string
	update_at: string
}

export default function MainPage() {
	const user_id = useParams()
	const [canvasData, setCanvasData] = useState<CanvasDataType[]>([])

	// TODO: fetch user data from server

	const response = {
		message: '개인 캔버스 전체 조회 성공',
		result: {
			canvases: [
				{
					canvas_id: 1,
					canvas_name: 'Untitled',
					update_at: '2023-01-05',
				},
				{
					canvas_id: 2,
					canvas_name: 'Untitled2',
					update_at: '2023-01-06',
				},
				{
					canvas_id: 3,
					canvas_name: 'Untitled3',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 4,
					canvas_name: 'Untitled4',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 5,
					canvas_name: 'Untitled5',
					update_at: '2023-01-07',
				},
				{
					canvas_id: 6,
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
		<div className="grid grid-cols-1 gap-8 mx-8 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{canvasData.map((canvas: CanvasDataType) => (
				<Canvas key={canvas.canvas_id} {...canvas} />
			))}
		</div>
	)
}
