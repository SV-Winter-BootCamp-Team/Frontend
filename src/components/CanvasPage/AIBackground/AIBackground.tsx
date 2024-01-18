import axios from 'axios'
import ReGenerateButton from '../../ReGenerateButton'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

type AIBackgroundProps = {
	setBackgroundStatus: (status: string) => void
	fetchBackgroundData: () => void
	backgroundList: string[]
	setBackgroundURL: (backgroundURL: string) => void
}

export default function AIBackground({
	setBackgroundStatus,
	fetchBackgroundData,
	backgroundList,
	setBackgroundURL,
}: AIBackgroundProps) {
	const params = useParams<{ canvas_id: string }>()

	const changeBackground = async (backgroundURL: string) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/ai/select/`,
				{ selected_url: backgroundURL },
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)
			console.log(response.data)

			setBackgroundURL(backgroundURL)
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

	return (
		<div className="flex flex-col items-center mt-8 grow">
			<div className="flex flex-col">
				{backgroundList.map((background, index) => (
					<img
						key={index}
						src={background}
						alt="background"
						onClick={() => {
							setBackgroundURL(background)
							changeBackground(background)
						}}
						className="w-[320px] h-[180px] mb-4 cursor-pointer"
					/>
				))}
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton
					handleBackButtonClick={(status) => setBackgroundStatus(status)}
					handleGenerateButtonClick={fetchBackgroundData}
				/>
			</div>
		</div>
	)
}
