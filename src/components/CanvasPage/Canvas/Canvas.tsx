import React, { useState, useEffect, useRef } from 'react'
import { MoveableElement } from '../../../pages/CanvasPage'
import Moveable from 'react-moveable'

type CanvasProps = {
	backgroundURL?: string
	componentList: MoveableElement[]
}

export default function Canvas({ backgroundURL, componentList }: CanvasProps) {
	const [selectedElement, setSelectedElement] = useState<string | null>(null)
	const boardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Add any necessary effect logic here
	}, [selectedElement, componentList])

	const handleElementClick = (elementId: string) => {
		setSelectedElement(elementId)
	}

	return (
		<div className="flex items-center justify-center w-screen">
			<div id="board" className="bg-white relative w-[912px] h-[513px]">
				{backgroundURL && (
					<img
						src={backgroundURL}
						alt="background"
						className="object-cover w-full h-full"
					/>
				)}
				{!backgroundURL && '드롭 영역'}
				{componentList.map((element) => (
					<div key={element.id} onClick={() => handleElementClick(element.id)}>
						<img
							id={element.id}
							src={element.src}
							style={{
								width: '100px',
								height: '100px',
								position: 'absolute',
								left: element.x,
								top: element.y,
								// Add more styles as needed
							}}
						/>
						{selectedElement === element.id && (
							<Moveable
								target={`#${element.id}`}
								draggable={true}
								resizable={true}
								rotatable={true}
								onDrag={({ target, left, top }) => {
									// 각 축에 대해 범위를 별도로 확인합니다.
									if (0 <= left && left <= 813 && 0 <= top && top <= 413) {
										target.style.left = `${left}px`
										target.style.top = `${top}px`
										console.log('onDrag', left, top)
									}
								}}
								onResize={({ target, width, height, drag, direction }) => {
									const beforeTranslate = drag.beforeTranslate
									let newWidth = width
									let newHeight = height

									if (
										target instanceof HTMLElement &&
										direction[0] &&
										direction[1]
									) {
										// 대각선 방향으로 리사이징하는 경우
										// 가로세로 비율 유지
										const originalWidth = target.offsetWidth
										const originalHeight = target.offsetHeight
										const ratio = originalWidth / originalHeight

										if (width / height > ratio) {
											newHeight = newWidth / ratio
										} else {
											newWidth = newHeight * ratio
										}
									}

									target.style.width = `${newWidth}px`
									target.style.height = `${newHeight}px`
									target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
								}}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
