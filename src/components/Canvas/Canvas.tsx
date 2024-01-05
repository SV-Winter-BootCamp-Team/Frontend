import React from 'react'

type CanvasProps = {
	isOpen: boolean
}

export default function Canvas({ isOpen }: CanvasProps) {
	const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const { clientX, clientY } = event
		const offsetX = clientX - event.currentTarget.getBoundingClientRect().left
		const offsetY = clientY - event.currentTarget.getBoundingClientRect().top
		event.dataTransfer.setData(
			'text/plain',
			JSON.stringify({ id: event.currentTarget.id, offsetX, offsetY }),
		)
	}

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const data = event.dataTransfer.getData('text/plain')
		const { id, offsetX, offsetY } = JSON.parse(data)
		const element = document.getElementById(id)
		if (element) {
			const boardRect = event.currentTarget.getBoundingClientRect()
			const x = event.clientX - boardRect.left - offsetX
			const y = event.clientY - boardRect.top - offsetY
			element.style.position = 'absolute'
			element.style.left = `${x}px`
			element.style.top = `${y}px`
			event.currentTarget.appendChild(element)
		}
	}

	return (
		<div className="flex">
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
			<div
				id="board"
				onDragOver={onDragOver}
				onDrop={onDrop}
				className={` bg-gray-300 relative ${
					isOpen ? 'w-[700px] h-[500px]' : 'w-[900px] h-[650px]'
				}`}
			>
				드롭 영역
			</div>
		</div>
	)
}
