import { useState } from 'react'
import ReGenerateButton from '../../General/ReGenerateButton'
import info from '/images/svg/info.svg'

type AIStickerProps = {
	handleAddComponent: (componentURL: string) => void
	setStickerStatus: (status: string) => void
	fetchStickerData: () => void
	stickerList: string[]
	inputText: string
	style: string
}

export default function AISticker({
	handleAddComponent,
	setStickerStatus,
	fetchStickerData,
	stickerList,
	inputText,
	style,
}: AIStickerProps) {
	const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

	const handleClick = (componentURL: string, index: number) => {
		if (clickedIndexes.includes(index)) {
		}
		// 클릭 처리
		handleAddComponent(componentURL)

		// 클릭된 인덱스 추가
		setClickedIndexes((prevIndexes) => [...prevIndexes, index])
	}

	return (
		<div className="flex flex-col items-center grow">
			<div className="w-[335px] h-[80px] flex items-center justify-center py-5 mt-8 mb-4 rounded-lg px-6 bg-blue-50">
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
				{stickerList.map((componentURL, index) => (
					<img
						src={componentURL}
						key={index}
						onClick={() => handleClick(componentURL, index)}
						className="w-40 h-40 p-4 bg-[#F0F1F3] rounded-lg cursor-pointer"
					/>
				))}
			</div>
			<div className="bg-[#F0F1F3] px-5 py-4 rounded-lg mt-8 flex text-[14px] font-normal w-[335px]">
				<p>
					<span style={{ color: '#5f9ba9' }}>{inputText}</span>를{' '}
					<span style={{ color: '#5f9ba9' }}>{style}</span> 스타일로 생성했어요.
				</p>
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton
					handleBackButtonClick={(status) => setStickerStatus(status)}
					handleGenerateButtonClick={fetchStickerData}
				/>
			</div>
		</div>
	)
}
