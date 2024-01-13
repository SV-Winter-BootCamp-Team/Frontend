import React, { useState, useEffect, useRef } from 'react'
import { MoveableElement } from '../../../pages/CanvasPage'
import Moveable from 'react-moveable'

type CanvasProps = {
	backgroundURL?: string
	componentList: MoveableElement[]
	setComponentList: (componentList: MoveableElement[]) => void
}

export default function Canvas({
	backgroundURL,
	componentList,
	setComponentList,
}: CanvasProps) {
	const [selectedElement, setSelectedElement] = useState<string | null>(null)

	useEffect(() => {}, [selectedElement, componentList])

	const handleElementClick = (elementId: string) => {
		setSelectedElement(elementId)
	}

	const handleDeselect = (e: React.MouseEvent) => {
		// 클릭된 요소가 board가 아니면 아무 것도 하지 않음
		if (e.target !== e.currentTarget) return

		setSelectedElement(null) // 선택 해제
	}

	return (
		<div className="flex items-center justify-center w-screen">
			<div
				id="board"
				className="bg-white relative w-[912px] h-[513px] border-solid border-[1px] border-[#E7E8EA]"
				onClick={handleDeselect} // board 클릭 이벤트 핸들러 추가
			>
				{backgroundURL && (
					<img
						src={backgroundURL}
						alt="background"
						className="object-cover w-full h-full"
					/>
				)}
				{!backgroundURL}
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
							}}
						/>
						<button
							onClick={(e) => {
								e.stopPropagation() // Prevents the click event from bubbling up to the parent div
								setComponentList(
									componentList.filter((item) => item.id !== element.id),
								)
							}}
							className="absolute top-0 right-0 w-6 h-6 text-white bg-red-500"
						>
							x
						</button>
						{selectedElement === element.id && (
							<Moveable
								target={`#${element.id}`}
								draggable={true}
								resizable={true}
								rotatable={true}
								onDrag={({ target, left, top }) => {
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
