import React, { useRef, useState } from 'react'
import Moveable from 'react-moveable'
import { Component } from '../../../pages/CanvasPage'
import x from '/images/svg/x.svg'

type CanvasProps = {
	backgroundURL?: string
	componentList: Component[]
	setComponentList: (componentList: Component[]) => void
}

export default function Canvas({
	backgroundURL,
	componentList,
	setComponentList,
}: CanvasProps) {
	const [selectedElement, setSelectedElement] = useState<number | null>(null)
	const canvasRef = useRef(null)

	const handleElementClick = (elementId: number) => {
		setSelectedElement(elementId)
	}

	const handleDeselect = (e: React.MouseEvent) => {
		// 클릭된 요소가 board가 아니면 아무 것도 하지 않음
		if (e.target !== e.currentTarget) return

		setSelectedElement(null) // 선택 해제
	}
	console.log('backgroundURL', backgroundURL)

	return (
		<div
			ref={canvasRef}
			className="flex items-center h-full justify-center w-screen bg-[#F1F2F4]"
		>
			<div
				id="board"
				className="overflow-hidden bg-white relative w-[912px] h-[513px] border-solid border-[1px] border-[#E7E8EA]"
				onClick={handleDeselect}
			>
				<img
					src={backgroundURL}
					className="absolute w-[912px] h-[513px]"
					onClick={handleDeselect}
				/>
				{!backgroundURL}
				{componentList.map(
					(element) =>
						element.component_id && (
							<div key={element.component_id} className="absolute">
								<div
									data-component-id={`element-${element.component_id}`}
									onClick={() => handleElementClick(element.component_id)}
									className="w-[100px] h-[100px] relative"
									style={{
										left: element.position_x,
										top: element.position_y,
									}}
								>
									<img src={element.component_url} className="w-full h-full" />
									{selectedElement === element.component_id && (
										<button
											onClick={(e) => {
												e.stopPropagation()
												setComponentList(
													componentList.filter(
														(item) =>
															item.component_id !== element.component_id,
													),
												)
												setSelectedElement(null) // 버튼 클릭 시 선택 해제
											}}
											className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-400"
										>
											<img src={x} className="w-2.5 h-2.5" />
										</button>
									)}
								</div>
								{selectedElement === element.component_id && (
									<Moveable
										target={`[data-component-id='element-${element.component_id}']`}
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
						),
				)}
			</div>
		</div>
	)
}
