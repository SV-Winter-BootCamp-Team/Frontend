import mm1 from '/images/png/mm1.png'
import mm2 from '/images/png/mm2.png'

interface AIStickerProps {
	handleAddComponent: (componentURL: string) => void
}

export default function AISticker({ handleAddComponent }: AIStickerProps) {
	const imgList: string[] = [mm1, mm2, mm1, mm2]

	const handleClick = (componentURL: string) => {
		handleAddComponent(componentURL)
	}

	return (
		<>
			<div>
				<p>결과가 아쉬우시다면 다시 생성하기 버튼을 눌러보세요</p>
			</div>
			<div className="grid grid-cols-2 gap-x-6 gap-y-7 my-7 mx-7">
				{imgList.map((componentURL, index) => (
					<img
						src={componentURL}
						key={index}
						onClick={() => handleClick(componentURL)}
						className="bg-[#F1F2F4] w-36 h-36 rounded-xl p-4"
					/>
				))}
			</div>
		</>
	)
}
