export default function AIBackgroundLoading() {
	return (
		<div className="flex flex-col items-center mt-8 grow">
			{/* AIBackground 스켈레톤 UI */}
			<div className="flex flex-col">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="w-[320px] h-[180px] mb-5 bg-gray-200 rounded-md animate-pulse"
					></div>
				))}
			</div>
			<div className="flex flex-col justify-end grow">
				{/* ReGenerateButton 스켈레톤 UI */}
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
