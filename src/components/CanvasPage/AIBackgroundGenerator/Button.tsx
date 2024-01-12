export type ButtonProps = {
	handleGenerateButtonClick: () => void
}

export default function Button({ handleGenerateButtonClick }: ButtonProps) {
	return (
		<div className="flex justify-center mb-6">
			<button className="flex items-center justify-center px-5 py-3 mr-2 bg-[rgba(202,198,239,0.35)] rounded-[10px]">
				<p className="text-[#7062D5]">초기화</p>
			</button>
			<button
				onClick={handleGenerateButtonClick}
				className="py-3 bg-[#7062D5] rounded-[10px] px-[103px] text-white flex justify-center items-center"
			>
				<p>생성</p>
			</button>
		</div>
	)
}
