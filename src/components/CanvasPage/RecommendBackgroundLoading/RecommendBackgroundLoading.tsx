import { useEffect } from 'react'

type RecommendBackgroundLoadingProps = {
	fetchRecommendedBackgrounds: () => void
}

export default function RecommendBackgroundLoading({
	fetchRecommendedBackgrounds,
}: RecommendBackgroundLoadingProps) {
	useEffect(() => {
		fetchRecommendedBackgrounds()
	}, [])

	return (
		<div className="flex flex-col items-center mt-8 grow">
			{/* RecommendBackground 스켈레톤 UI */}
			<div className="flex flex-col">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="w-[320px] h-[180px] mb-5 bg-gray-200 rounded-md animate-pulse"
					></div>
				))}
			</div>
		</div>
	)
}
