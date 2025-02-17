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
	const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

	const handleClick = (componentURL: string, index: number) => {
		if (clickedIndexes.includes(index)) return

		// 클릭 처리
		handleAddComponent(componentURL)

		// 클릭된 인덱스 추가
		setClickedIndexes((prevIndexes) => [...prevIndexes, index])
	}

	const fetchStickerHistory = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}canvases/${params.canvas_id}/stickers/ai/select/`,
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
						onClick={() => handleClick(component.component_url, index)}
						className="w-40 h-40 p-4 bg-[#F0F1F3] rounded-lg cursor-pointer"
					/>
				))}
			</div>
		</div>
	)
}
