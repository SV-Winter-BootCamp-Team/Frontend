import mm1 from '/images/png/mm1.png'
import mm2 from '/images/png/mm2.png'

interface AIStickerProps {
	handleAddComponent: (componentURL: string) => void
}

export default function AISticker({ handleAddComponent }: AIStickerProps) {
	const imgList: string[] = [mm1, mm2]

	const handleClick = (componentURL: string) => {
		handleAddComponent(componentURL)
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-6 my-7 mx-7">
				{imgList.map((componentURL, index) => (
					<img
						src={componentURL}
						key={index}
						onClick={() => handleClick(componentURL)}
						className="bg-red-400 w-36 h-36"
					/>
				))}
			</div>
		</>
	)
}
