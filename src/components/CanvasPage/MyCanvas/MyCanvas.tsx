import { useEffect, useState } from 'react'
import axios from 'axios'

type Canvas = {
	canvas_id: number
	canvas_preview_url: string
	canvas_name: string
	update_at: string
}

export default function MyCanvas() {
	const [canvases, setCanvases] = useState<Canvas[]>([])
	const user_id = localStorage.getItem('user_id')

	const fetchCanvases = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/v1/canvases/personal/${user_id}/`,
			)
			setCanvases(response.data.result.canvases)
			console.log(response.data.result.canvases)
		} catch (error) {
			console.error('Error fetching canvases:', error)
		}
	}

	useEffect(() => {
		fetchCanvases()
	}, [])
	return (
		<div className="flex flex-col mt-8">
			{canvases.map((canvas) => (
				<div key={canvas.canvas_id} className="flex flex-col items-center mb-4">
					<img
						src={canvas.canvas_preview_url}
						className="w-[304px] h-[171px] mb-2"
					></img>
					<p>{canvas.canvas_name}</p>
				</div>
			))}
		</div>
	)
}
