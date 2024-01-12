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
		const board = event.currentTarget

		if (element && board) {
			const boardRect = board.getBoundingClientRect()
			let x = event.clientX - boardRect.left - offsetX
			let y = event.clientY - boardRect.top - offsetY

			// board 영역 내로 요소의 위치를 제한
			x = Math.max(0, Math.min(x, boardRect.width - element.offsetWidth))
			y = Math.max(0, Math.min(y, boardRect.height - element.offsetHeight))

			element.style.position = 'absolute'
			element.style.left = `${x}px`
			element.style.top = `${y}px`

			board.appendChild(element)
		}
	}

	return (
		<div className="flex items-center justify-center w-screen">
			{backgroundImage ? (
				<div
					id="board"
					onDragOver={onDragOver}
					onDrop={onDrop}
					className="bg-white relative w-[912px] h-[513px]"
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
