import { useEffect, useState } from 'react'
import UploadButton from './UploadButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export type UploadProps = {
	setBackgroundURL: (backgroundURL: string) => void
}

export type Background = {
	id: number
	component_url: string
}

export default function UploadBackground({ setBackgroundURL }: UploadProps) {
	const params = useParams<{ canvas_id: string }>()
	const [backgrounds, setBackgrounds] = useState<Background[]>([])
	const [socket, setSocket] = useState<WebSocket | null>(null)

	const fetchBackgrounds = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/upload/`,
			)
			console.log(response.data.result.component)
			setBackgrounds(response.data.result.component)
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

	const changeBackground = async (backgroundURL: string) => {
		try {
			// 여기에서 backgroundURL을 사용하여 API 호출을 수행
			const res = await fetch(backgroundURL)
			const blob = await res.blob()

			// Blob을 FormData에 추가
			const formData = new FormData()
			formData.append('file', blob) // 'file'은 서버가 예상하는 필드 이름입니다.
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/upload/`,
				formData,
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
		fetchBackgrounds()
		const newSocket = new WebSocket(
			'ws://' + 'localhost:8000' + '/ws/canvases/' + params.canvas_id + '/',
		) // Adjust the URL to your WebSocket server
		setSocket(newSocket)
	}, [])

	return (
		<div className="flex flex-col">
			<div>
				<UploadButton
					setBackgroundURL={setBackgroundURL}
					setBackgrounds={setBackgrounds}
					backgrounds={backgrounds}
				/>
			</div>
			<div className="flex flex-col mt-8 ml-8">
				{backgrounds.map((background) => (
					<img
						onClick={() => {
							setBackgroundURL(background.component_url)
							changeBackground(background.component_url)
						}}
						src={background.component_url}
						className="w-[304px] h-[171px] mb-4 cursor-pointer"
						key={background.id}
					></img>
				))}
			</div>
		</div>
	)
}
