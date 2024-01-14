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
				className="overflow-hidden bg-white relative w-[912px] h-[513px] border-solid border-[1px] border-[#E7E8EA]"
				onClick={handleDeselect} // board 클릭 이벤트 핸들러 추가
				style={{
					backgroundImage: `url(${backgroundURL})`,
					backgroundSize: 'cover',
				}}
			>
				{!backgroundURL}
				{componentList.map((element) => (
					<div className="absolute ">
						<div
							id={element.id}
							key={element.id}
							onClick={() => handleElementClick(element.id)}
							className=""
							style={{
								width: '100px',
								height: '100px',
								position: 'relative',
								left: element.x,
								top: element.y,
							}}
						>
							<img src={element.src} className="w-full h-full" />
							<button
								onClick={(e) => {
									e.stopPropagation() // Prevents the click event from bubbling up to the parent div
									setComponentList(
										componentList.filter((item) => item.id !== element.id),
									)
								}}
								className="absolute top-[-10px] right-[-10px] w-6 h-6 text-white bg-red-500"
							>
								x
							</button>
						</div>
						{selectedElement === element.id && (
							<Moveable
								target={`#${element.id}`}
								draggable={true}
								resizable={true}
								rotatable={true}
								onDrag={({ target, left, right, top, bottom }) => {
									target.style.left = `${left}px`
									target.style.top = `${top}px`
									console.log('onDrag', left, right, top, bottom)
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
