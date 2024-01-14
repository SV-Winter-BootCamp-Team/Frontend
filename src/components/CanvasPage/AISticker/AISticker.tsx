import ReGenerateButton from '../../ReGenerateButton'
import mm1 from '/images/png/mm1.png'
import mm2 from '/images/png/mm2.png'
import info from '/images/svg/info.svg'

type AIStickerProps = {
	handleAddComponent: (componentURL: string) => void
}

export default function AISticker({ handleAddComponent }: AIStickerProps) {
	const imgList: string[] = [mm1, mm2, mm1, mm2]

	const handleClick = (componentURL: string) => {
		handleAddComponent(componentURL)
	}

	return (
		<div className="flex flex-col items-center grow">
			<div className="flex items-center justify-center py-4 px-7 mt-8 mb-4 bg-[#EBF1FC] rounded-lg">
				<img src={info} className="w-5 h-5 mr-2" />
				<div>
					<h3 className="text-[14px] text-[#413f3f] font-medium">
						결과가 아쉽다면 다시 생성 버튼을 눌러보세요.
					</h3>
					<p className="text-[13.5px] text-[#636060]">
						비슷한 느낌의 이미지를 재생성 해드려요.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{imgList.map((componentURL, index) => (
					<img
						src={componentURL}
						key={index}
						onClick={() => handleClick(componentURL)}
						className="bg-[#f6f8fa] w-40 h-40 rounded-lg p-4"
					/>
				))}
			</div>
			<div className="bg-[#F1F2F4] px-5 py-4 rounded-lg mt-8">
				<p className="text-[14px] font-normal">
					귀여운 마이멜로디를 애니매이션 스타일로 생성했어요.
				</p>
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton handleGenerateButtonClick={() => {}} />
			</div>
		</div>
	)
}
