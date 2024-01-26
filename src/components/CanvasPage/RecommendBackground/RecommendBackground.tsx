import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type RecommendBackgroundProps = {
	setBackgroundURL: (backgroundURL: string) => void
	Recommendbackgrounds: string[]
}

export default function RecommendBackground({
	setBackgroundURL,
	Recommendbackgrounds,
}: RecommendBackgroundProps) {
	const params = useParams<{ canvas_id: string }>()
	const [socket, setSocket] = useState<WebSocket | null>(null)

	const changeBackground = async (backgroundURL: string) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/recommend/`,
				{ selected_url: backgroundURL },
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)
			console.log(response.data)

			setBackgroundURL(backgroundURL)
			socket?.send(
				JSON.stringify({
					type: 'add',
					user_id: localStorage.getItem('user_id'),
					component_id: response.data.result.component.component_id,
					component_url: backgroundURL,
					component_type: 'background',
				}),
			)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = error.response?.data.message || error.message
				console.log(errorMessage)
			} else if (error instanceof Error) {
				// 일반 오류 처리
				console.log(error.message)
			} else {
				// 알 수 없는 오류 처리
				console.log('An unexpected error occurred.')
			}
		}
	}

	useEffect(() => {
		const newSocket = new WebSocket(
			'ws://' + 'localhost:8000' + '/ws/canvases/' + params.canvas_id + '/',
		) // Adjust the URL to your WebSocket server
		setSocket(newSocket)
	}, [])

	return (
		<div className="flex flex-col items-center mt-8">
			{Recommendbackgrounds.map((background, index) => (
				<img
					onClick={() => {
						setBackgroundURL(background)
						changeBackground(background)
					}}
					key={index}
					src={background}
					className="w-[304px] h-[171px] mb-5 cursor-pointer rounded-md"
				/>
			))}
		</div>
	)
}
