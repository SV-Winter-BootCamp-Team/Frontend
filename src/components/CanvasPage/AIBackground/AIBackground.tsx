import ReGenerateButton from '../../ReGenerateButton'

type AIBackgroundProps = {
	setBackgroundStatus: (status: string) => void
	fetchBackgroundData: () => void
	backgroundList: string[]
}

export default function AIBackground({
	setBackgroundStatus,
	fetchBackgroundData,
	backgroundList,
}: AIBackgroundProps) {
	return (
		<div className="flex flex-col items-center mt-8 grow">
			<div className="flex flex-col">
				{backgroundList.map((background, index) => (
					<img
						key={index}
						src={background}
						alt="background"
						onClick={() => {
							setBackgroundStatus(background)
						}}
						className="w-[320px] h-[180px] mb-4 cursor-pointer"
					/>
				))}
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton
					handleBackButtonClick={(status) => setBackgroundStatus(status)}
					handleGenerateButtonClick={fetchBackgroundData}
				/>
			</div>
		</div>
	)
}
