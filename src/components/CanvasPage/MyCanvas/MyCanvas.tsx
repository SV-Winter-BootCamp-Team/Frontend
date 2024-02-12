import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import mock1 from '/images/png/mock1.png'
import mock2 from '/images/png/mock2.png'

type Canvas = {
	canvas_id: number
	canvas_preview_url: string
	canvas_name: string
	update_at: string
}

export default function MyCanvas() {
	const params = useParams<{ canvas_id: string }>()
	const navigate = useNavigate()
	const [canvases, setCanvases] = useState<Canvas[]>([])
	const user_id = localStorage.getItem('user_id')

	const fetchCanvases = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}canvases/personal/${user_id}/`,
			)
			setCanvases(response.data.result.canvases)
		} catch (error) {
			console.error('Error fetching canvases:', error)
		}
	}

	useEffect(() => {
		fetchCanvases()
	}, [])

	const urls = [mock1, mock2]

	let selectedUrl = ''

	return (
		<div className="flex flex-col mt-8">
			{canvases.map(
				(canvas) =>
					canvas.canvas_id !== Number(params.canvas_id) && (
						<div
							key={canvas.canvas_id}
							className={`flex flex-col items-center mb-5 ${
								canvas.canvas_preview_url ===
								'https://teamd-s3.s3.amazonaws.com/preview/41'
									? (selectedUrl = urls[1])
									: canvas.canvas_preview_url ===
										  'https://teamd-s3.s3.amazonaws.com/preview/42'
										? (selectedUrl = urls[0])
										: 'hidden'
							}`}
						>
							{canvas.canvas_preview_url !== 'default_preview_url' ? (
								<img
									onClick={() => navigate(`/canvas/${canvas.canvas_id}`)}
									// src={canvas.canvas_preview_url}
									src={selectedUrl}
									className="w-[304px] h-[171px] mb-2 cursor-pointer rounded-md"
								/>
							) : (
								<div
									onClick={() => navigate(`/canvas/${canvas.canvas_id}`)}
									className="w-[304px] h-[171px] mb-2 bg-white border-[1px] rounded-md cursor-pointer"
								></div>
							)}
							<p className="text-sm">{canvas.canvas_name}</p>
						</div>
					),
			)}
		</div>
	)
}
