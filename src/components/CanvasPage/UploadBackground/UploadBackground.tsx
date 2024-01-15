import { useEffect, useState } from 'react'
import UploadButton from './UploadButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export type UploadProps = {
	setBackgroundURL: (backgoundURL: string) => void
}

type Background = {
	id: number
	component_url: string
}

export default function UploadBackground({ setBackgroundURL }: UploadProps) {
	const params = useParams<{ canvas_id: string }>()
	const [backgrounds, setBackgrounds] = useState<Background[]>([])

	useEffect(() => {
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
		fetchBackgrounds()
	}, [])

	backgrounds.map((background) => {
		console.log(background.component_url)
	})

	return (
		<div className="flex flex-col">
			<div>
				<UploadButton setBackgroundURL={setBackgroundURL} />
			</div>
			<div className="flex flex-col mt-8 ml-8">
				{backgrounds.map((background) => (
					<div
						className="w-[304px] bg-blue-300 h-[171px] mb-4"
						key={background.id}
					>
						<img src={background.component_url} alt="background" />
					</div>
				))}
			</div>
		</div>
	)
}
