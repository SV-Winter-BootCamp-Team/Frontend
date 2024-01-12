export default function AIStickerLoading() {
	return (
		<>
			<div className="grid grid-cols-2 gap-6 my-7 mx-7">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						id={`draggable-${index}`}
						draggable="false"
						className="overflow-auto w-36 h-36 cursor-grab resize-both"
					/>
				))}
			</div>
		</>
	)
}
