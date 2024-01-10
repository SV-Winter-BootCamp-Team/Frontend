import React from 'react'

type CanvasProps = {
	isOpen: boolean
	backgroundImage?: string
}

export default function Canvas({ isOpen, backgroundImage }: CanvasProps) {
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
		<div className="flex items-center justify-center w-screen">
			{backgroundImage ? (
				<div
					id="board"
					onDragOver={onDragOver}
					onDrop={onDrop}
					className="bg-white relative w-[960px] h-[540px]"
				>
					<img
						src={backgroundImage}
						alt="background"
						className="object-cover w-full h-full"
					/>
				</div>
			) : (
				<div
					id="board"
					onDragOver={onDragOver}
					onDrop={onDrop}
					className="bg-white relative w-[912px] h-[513px]"
				>
					드롭 영역
				</div>
			)}
		</div>
	)
}
