export type ReGenerateButtonProps = {
	handleGenerateButtonClick: () => void
	handleBackButtonClick: (status: string) => void
}

export default function ReGenerateButton({
	handleGenerateButtonClick,
	handleBackButtonClick,
}: ReGenerateButtonProps) {
	return (
		<div className="flex justify-center mb-7">
			<button
				onClick={() => handleBackButtonClick('generator')}
				className="flex items-center justify-center px-[53px] py-3 mr-2 bg-cyan-50 rounded-[10px]"
			>
				<p className="text-[#66cae1]">돌아가기</p>
			</button>
			<button
				onClick={handleGenerateButtonClick}
				className="py-3 bg-[#66cae1] rounded-[10px] px-[53px] text-white flex justify-center items-center"
			>
				<p>다시 생성</p>
			</button>
		</div>
	)
}
