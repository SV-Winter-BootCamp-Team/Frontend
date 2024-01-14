export type ReGenerateButtonProps = {
	handleGenerateButtonClick: () => void
}

export default function ReGenerateButton({
	handleGenerateButtonClick,
}: ReGenerateButtonProps) {
	return (
		<div className="flex justify-center mb-7">
			<button className="flex items-center justify-center px-[53px] py-3 mr-2 bg-[rgba(202,198,239,0.35)] rounded-[10px]">
				<p className="text-[#7062D5]">돌아가기</p>
			</button>
			<button
				onClick={handleGenerateButtonClick}
				className="py-3 bg-[#7062D5] rounded-[10px] px-[53px] text-white flex justify-center items-center"
			>
				<p>다시 생성</p>
			</button>
		</div>
	)
}
