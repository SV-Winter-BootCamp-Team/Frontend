import React, { useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'
import { Component } from '../../../pages/CanvasPage'
import x from '/images/svg/x.svg'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type CanvasProps = {
	backgroundURL?: string
	componentList: Component[]
	setComponentList: (componentList: Component[]) => void
	updateComponent: (component: Component) => void
}

export default function Canvas({
	backgroundURL,
	componentList,
	setComponentList,
	updateComponent,
}: CanvasProps) {
	const params = useParams<{ canvas_id: string }>()
	const [selectedElement, setSelectedElement] = useState<number | null>(null)
	const canvasRef = useRef(null)

	const canvasId = params.canvas_id
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null)

	const handleElementClick = (elementId: number) => {
		setSelectedElement(elementId)
	}

	const handleDeselect = (e: React.MouseEvent) => {
		// 클릭된 요소가 board가 아니면 아무 것도 하지 않음
		if (e.target !== e.currentTarget) return

		setSelectedElement(null) // 선택 해제
	}

	const handleDeleteComponent = async (
		e: React.MouseEvent,
		componentId: number,
	) => {
		e.stopPropagation()

		// componentList에서 요소 제거
		const updatedComponentList = componentList.filter(
			(item) => item.component_id !== componentId,
		)
		setComponentList(updatedComponentList)

		// API 요청을 통해 서버에서 요소 삭제
		try {
			const response = await axios.delete(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/${componentId}/`,
			)
		} catch (error) {
			console.error('Error deleting component:', error)
		}

		setSelectedElement(null) // 선택 해제
	}

	useEffect(() => {
		// WebSocket 연결 설정
		const newSocket = new WebSocket(
			// 'ws://' + window.location.host + '/ws/canvases/' + canvasId + '/',
			'ws://' + 'localhost:8000' + '/ws/canvases/' + canvasId + '/',
		)

		setChatSocket(newSocket)
	}, [canvasId])

	useEffect(() => {
		if (chatSocket) {
			// 메시지 수신 처리
			chatSocket.onmessage = (e) => {
				var data = JSON.parse(e.data)
				// console.log(data.type)
				if (data.type === 'resize') {
					const updatedComponentList = componentList.map((component) => {
						if (component.component_id === data.component_id) {
							return {
								...component,
								width: data.width,
								height: data.height,
							}
						}
						return component
					})
					setComponentList(updatedComponentList)
				} else if (data.type === 'position') {
					const updatedComponentList = componentList.map((component) => {
						if (component.component_id === data.component_id) {
							return {
								...component,
								position_x: data.position_x,
								position_y: data.position_y,
							}
						}
						return component
					})

					// 컴포넌트 리스트 상태 업데이트
					setComponentList(updatedComponentList)
				} else if (data.type === 'rotate') {
					const updatedComponentList = componentList.map((component) => {
						if (component.component_id === data.component_id) {
							return {
								...component,
								rotate: data.rotate,
							}
						}
						return component
					})
					setComponentList(updatedComponentList)
				}
			}
		}
	}, [chatSocket, componentList])

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
									className="relative"
									style={{
										width: element.width,
										height: element.height,
										left: element.position_x,
										top: element.position_y,
									}}
								>
									<img src={element.component_url} className="w-full h-full" />
									{selectedElement === element.component_id && (
										<button
											onClick={(e) =>
												handleDeleteComponent(e, element.component_id)
											}
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
										onDrag={({ target, left, top }) => {
											target.style.left = `${left}px`
											target.style.top = `${top}px`

											updateComponent({
												...element,
												position_x: left,
												position_y: top,
											})
											console.log(localStorage.getItem('user_id'))
											chatSocket?.send(
												JSON.stringify({
													type: 'position',
													user_id: localStorage.getItem('user_id'),
													component_id: element.component_id,
													position_x: left,
													position_y: top,
												}),
											)
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

											updateComponent({
												...element,
												width: newWidth,
												height: newHeight,
											})

											chatSocket?.send(
												JSON.stringify({
													type: 'resize',
													user_id: localStorage.getItem('user_id'),
													component_id: element.component_id,
													width: newWidth,
													height: newHeight,
												}),
											)
										}}
										onRotate={({ target, beforeRotate }) => {
											target.style.transform = `rotate(${beforeRotate}deg)`

											updateComponent({
												...element,
												rotate: beforeRotate,
											})

											chatSocket?.send(
												JSON.stringify({
													type: 'rotate',
													user_id: localStorage.getItem('user_id'),
													component_id: element.component_id,
													rotate: beforeRotate,
												}),
											)
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
