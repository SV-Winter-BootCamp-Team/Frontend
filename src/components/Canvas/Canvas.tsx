import React, { useState } from 'react'

const App: React.FC = () => {
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
						className="w-32 h-32 mb-10 bg-blue-300 cursor-grab"
					>
						요소 {index + 1}
					</div>
				))}
			</div>
			<div
				id="board"
				onDragOver={onDragOver}
				onDrop={onDrop}
				className="w-[500px] h-[500px] bg-gray-300 relative"
			>
				드롭 영역
			</div>
		</div>
	)
}

export default App
