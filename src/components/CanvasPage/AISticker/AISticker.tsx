export default function AISticker() {
	const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const { clientX, clientY } = event
		const offsetX = clientX - event.currentTarget.getBoundingClientRect().left
		const offsetY = clientY - event.currentTarget.getBoundingClientRect().top
		event.dataTransfer.setData(
			'text/plain',
			JSON.stringify({ id: event.currentTarget.id, offsetX, offsetY }),
		)
	}

	return (
		<>
			<div>AISticker</div>
			<div className="p-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						id={`draggable-${index}`}
						draggable="true"
						onDragStart={onDragStart}
						className="w-16 h-16 mb-10 bg-blue-300 cursor-grab"
					>
						요소 {index + 1}
					</div>
				))}
			</div>
		</>
	)
}
