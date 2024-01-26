import info from '/images/svg/info.svg'

type AIStickerLoadingProps = {
	inputText: string
	style: string
}

export default function AIStickerLoading({
	inputText,
	style,
}: AIStickerLoadingProps) {
	return (
		<div className="flex flex-col items-center grow">
			<div className="flex items-center h-[80px] mt-8 mb-4 bg-blue-50 rounded-lg w-[335px] py-5 px-6">
				<img src={info} className="w-5 h-5 mr-2" />
				<div>
					<h3 className="text-[14px] text-[#413f3f] font-medium">
						스티커에 대한 묘사는 자세할수록 좋아요.
					</h3>
					<p className="text-[13.5px] text-[#636060]">
						예시) 맥북으로 코딩을 하고 있는 귀여운 토끼
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="bg-[#f6f8fa] w-40 h-40 rounded-lg p-4 animate-pulse"
					></div>
				))}
			</div>
			<div className="bg-[#F0F1F3] px-5 py-4 rounded-lg mt-8 flex text-[14px] font-normal w-[335px]">
				<p>
					<span style={{ color: '#5f9ba9' }}>{inputText}</span>를{' '}
					<span style={{ color: '#5f9ba9' }}>{style}</span> 스타일로 생성하고
					있어요.
				</p>
			</div>
			<div className="flex flex-col justify-end grow">
				{/* 버튼 스켈레톤, 필요한 경우 */}
				<div className="flex justify-center mb-7">
					<div className="h-12 w-40 flex items-center justify-center mr-2 bg-gray-200 rounded-[10px] animate-pulse">
						<div className="w-24 h-4 bg-gray-300 rounded"></div>
					</div>
					<div className="h-12 w-40 bg-gray-200 rounded-[10px] flex justify-center items-center animate-pulse">
						<div className="w-24 h-4 bg-gray-300 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
