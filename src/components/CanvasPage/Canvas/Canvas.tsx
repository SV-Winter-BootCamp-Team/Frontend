import React, { useState } from 'react'

type CanvasProps = {
	isOpen: boolean
	backgroundImage?: string
}

export default function Canvas({ isOpen, backgroundImage }: CanvasProps) {
	const [elements, setElements] = useState<Array<JSX.Element>>([])
	const [selectedElement, setSelectedElement] = useState<string | null>(null)
	const [isResizing, setIsResizing] = useState<boolean>(false)
	const [resizeDirection, setResizeDirection] = useState<string>('')

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const data = event.dataTransfer.getData('text/plain')
		const { id, type } = JSON.parse(data)

		if (type === 'element') {
			const newElement = createElement(id)
			const updatedElements = [...elements, newElement]
			setElements(updatedElements)
			setSelectedElement(newElement.key)
		}
	}

	const createElement = (type: string) => {
		const newElement = (
			<div
				key={type + Date.now()}
				className={`element ${type}`}
				onMouseDown={(e) => onElementMouseDown(e, type)}
				style={{ top: '100px', left: '100px' }}
			>
				{type}
				<div
					className="resize-handle top-left"
					onMouseDown={(e) => onResize(e, 'top-left')}
				></div>
				<div
					className="resize-handle top-right"
					onMouseDown={(e) => onResize(e, 'top-right')}
				></div>
				<div
					className="resize-handle bottom-left"
					onMouseDown={(e) => onResize(e, 'bottom-left')}
				></div>
				<div
					className="resize-handle bottom-right"
					onMouseDown={(e) => onResize(e, 'bottom-right')}
				></div>
				<div className="rotate-handle" onMouseDown={(e) => onRotate(e)}>
					&#8635;
				</div>
			</div>
		)

		return newElement
	}

	const onElementMouseDown = (
		event: React.MouseEvent<HTMLDivElement>,
		id: string,
	) => {
		setSelectedElement(id)
	}

	const onResize = (
		event: React.MouseEvent<HTMLDivElement>,
		direction: string,
	) => {
		setSelectedElement(null)
		setIsResizing(true)
		setResizeDirection(direction)

		const board = document.getElementById('board')
		if (board) {
			const boardRect = board.getBoundingClientRect()

			function eventMoveHandler(event: MouseEvent) {
				if (selectedElement && isResizing) {
					const element = document.querySelector(`.${selectedElement}`)
					if (element) {
						const elementRect = element.getBoundingClientRect()
						const offsetX = event.clientX - elementRect.left
						const offsetY = event.clientY - elementRect.top
						const originalWidth = element.offsetWidth
						const originalHeight = element.offsetHeight

						const x = event.clientX - boardRect.left - offsetX
						const y = event.clientY - boardRect.top - offsetY

						let newWidth = originalWidth
						let newHeight = originalHeight

						if (direction.includes('left')) {
							newWidth = originalWidth + (elementRect.left - event.clientX)
						} else if (direction.includes('right')) {
							newWidth = event.clientX - elementRect.left
						}

						if (direction.includes('top')) {
							newHeight = originalHeight + (elementRect.top - event.clientY)
						} else if (direction.includes('bottom')) {
							newHeight = event.clientY - elementRect.top
						}

						// board 영역 내로 요소의 크기를 제한
						newWidth = Math.max(10, Math.min(newWidth, boardRect.width - x))
						newHeight = Math.max(10, Math.min(newHeight, boardRect.height - y))

						element.style.width = `${newWidth}px`
						element.style.height = `${newHeight}px`
					}
				}
			}

			window.addEventListener('mousemove', eventMoveHandler)

			window.addEventListener('mouseup', () => {
				setIsResizing(false)
				setResizeDirection('')
				window.removeEventListener('mousemove', eventMoveHandler)
			})
		}
	}

	const onRotate = (event: React.MouseEvent<HTMLDivElement>) => {
		setSelectedElement(null)
		const element = document.querySelector(`.${selectedElement}`)
		if (element) {
			const board = document.getElementById('board')
			if (board) {
				const boardRect = board.getBoundingClientRect()
				const elementRect = element.getBoundingClientRect()
				const centerX = boardRect.left + boardRect.width / 2
				const centerY = boardRect.top + boardRect.height / 2
				const startX = elementRect.left + elementRect.width / 2
				const startY = elementRect.top + elementRect.height / 2

				const initialAngle = Math.atan2(startY - centerY, startX - centerX)

				function eventMoveHandler(event: MouseEvent) {
					const currentX = event.clientX
					const currentY = event.clientY

					const newAngle = Math.atan2(currentY - centerY, currentX - centerX)
					const rotationAngle = (newAngle - initialAngle) * (180 / Math.PI)

					element.style.transform = `rotate(${rotationAngle}deg)`
				}

				window.addEventListener('mousemove', eventMoveHandler)

				window.addEventListener('mouseup', () => {
					window.removeEventListener('mousemove', eventMoveHandler)
				})
			}
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
					{isOpen && elements}
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
