export type GenerateButtonProps = {
	handleGenerateButtonClick: () => void
	handleResetButtonClick: () => void
}

export default function GenerateButton({
	handleGenerateButtonClick,
	handleResetButtonClick,
}: GenerateButtonProps) {
	return (
		<div className="flex justify-center mb-7">
			<button
				onClick={handleResetButtonClick}
				className="flex items-center justify-center px-5 py-3 mr-2 bg-cyan-50 rounded-[10px]"
			>
				<p className="text-[#66cae1]">초기화</p>
			</button>
			<button
				onClick={handleGenerateButtonClick}
				className="py-3 bg-[#66cae1] rounded-[10px] px-[103px] text-white flex justify-center items-center"
			>
				<p>생성</p>
			</button>
		</div>
	)
}
