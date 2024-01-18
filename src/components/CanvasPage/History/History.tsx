import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type HistoryProps = {
	handleAddComponent: (componentURL: string) => void
}

type History = {
	id: number
	component_url: string
}

export default function History({ handleAddComponent }: HistoryProps) {
	const params = useParams<{ canvas_id: string }>()
	const [historyList, setHistoryList] = useState<History[]>([])

	const handleClick = (componentURL: string) => {
		handleAddComponent(componentURL)
	}

	const fetchStickerHistory = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/stickers/ai/select/`,
			)
			console.log(response.data)
			setHistoryList(response.data.result.component)
		} catch (error) {
			console.error('Error fetching sticker history:', error)
		}
	}

	useEffect(() => {
		fetchStickerHistory()
	}, [])

	return (
		<div className="flex flex-col items-center grow">
			<div className="grid grid-cols-2 gap-4 mt-4">
				{historyList.map((component, index) => (
					<img
						src={component.component_url}
						key={index}
						onClick={() => handleClick(component.component_url)}
						className="w-40 h-40 p-4 bg-gray-100 rounded-lg cursor-pointer"
					/>
				))}
			</div>
		</div>
	)
}
