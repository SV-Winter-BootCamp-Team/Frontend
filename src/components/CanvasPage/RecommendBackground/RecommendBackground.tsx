import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type RecommendBackgroundProps = {
	setBackgroundURL: (backgroundURL: string) => void
}

export default function RecommendBackground({
	setBackgroundURL,
}: RecommendBackgroundProps) {
	const params = useParams<{ canvas_id: string }>()
	const [backgrounds, setBackgrounds] = useState([])

	const fetchRecommendedBackgrounds = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/recommend/`,
			)
			console.log('Recommended backgrounds:', response.data)
			setBackgrounds(response.data.results)
		} catch (error) {
			console.error('Error fetching recommended backgrounds:', error)
		}
	}

	useEffect(() => {
		fetchRecommendedBackgrounds()
	}, [])

	return (
		<div className="flex flex-col items-center mt-8">
			{backgrounds.map((background, index) => (
				<img
					onClick={() => {
						setBackgroundURL(background)
					}}
					key={index}
					src={background}
					className="w-[304px] h-[171px] mb-2 cursor-pointer"
				/>
			))}
		</div>
	)
}
