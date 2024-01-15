import ReGenerateButton from '../../ReGenerateButton'

type AIBackgroundProps = {
	handleApplyBackground: (backgroundURL: string) => void
	setBackgroundStatus: (status: string) => void
	handleGenerateBackground: () => void
}

export default function AIBackground({
	handleApplyBackground,
	setBackgroundStatus,
	handleGenerateBackground,
}: AIBackgroundProps) {
	return (
		<div className="flex flex-col items-center mt-8 grow">
			<div className="flex flex-col">
				<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
				<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
				<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton
					handleBackButtonClick={(status) => setBackgroundStatus(status)}
					handleGenerateButtonClick={handleGenerateBackground}
				/>
			</div>
		</div>
	)
}
