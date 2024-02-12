export type ButtonProps = {
	text: string
	handleClickButton: () => void
	hoverBackgroundColor: string
	activeBackgroundColor: string
	hoverTextColor: string
}

export default function Button({
	text,
	handleClickButton,
	hoverBackgroundColor,
	activeBackgroundColor,
	hoverTextColor,
}: ButtonProps) {
	return (
		<div className="flex font-sans font-normal text-white">
			<button
				className={`rounded-lg py-[11px] px-5 text-[13px] mx-2 flex items-center bg-cyan-50 text-[#60c0d0] ${activeBackgroundColor} ${hoverBackgroundColor} ${hoverTextColor}`}
				onClick={handleClickButton}
			>
				{text}
			</button>
		</div>
	)
}
