import mm1 from '/images/png/mm1.png'
import mm2 from '/images/png/mm2.png'

type HistoryProps = {
	handleAddComponent: (componentURL: string) => void
}

export default function History({ handleAddComponent }: HistoryProps) {
	const imgList: string[] = [mm1, mm2, mm1, mm2]

	const handleClick = (componentURL: string) => {
		handleAddComponent(componentURL)
	}

	return (
		<div className="flex flex-col items-center grow">
			<div className="grid grid-cols-2 gap-4 mt-4">
				{imgList.map((componentURL, index) => (
					<img
						src={componentURL}
						key={index}
						onClick={() => handleClick(componentURL)}
						className="w-40 h-40 p-4 bg-gray-100 rounded-lg"
					/>
				))}
			</div>
		</div>
	)
}
