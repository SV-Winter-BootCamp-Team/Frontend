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
			<div className="grid grid-cols-2 gap-6 my-7 mx-7">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						id={`draggable-${index}`}
						draggable="true"
						onDragStart={onDragStart}
						className="bg-blue-300 w-36 h-36 cursor-grab"
					>
						요소 {index + 1}
					</div>
				))}
			</div>
		</>
	)
}
