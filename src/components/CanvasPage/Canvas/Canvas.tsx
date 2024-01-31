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
	setBackgroundURL: (backgroundURL: string) => void
}

export default React.memo(function Canvas({
	backgroundURL,
	componentList,
	setComponentList,
	updateComponent,
	setBackgroundURL,
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
			await axios.delete(
				`${import.meta.env.VITE_BASE_URL}canvases/${params.canvas_id}/${componentId}/`,
			)
			// chatSocket?.send(
			// 	JSON.stringify({
			// 		type: 'remove',
			// 		user_id: localStorage.getItem('user_id'),
			// 		component_id: componentId,
			// 	}),
			// )
		} catch (error) {
			console.error('Error deleting component:', error)
		}

		setSelectedElement(null) // 선택 해제
	}

	useEffect(() => {
		const newSocket = new WebSocket(
			`ws://${import.meta.env.VITE_SOCKET_URL}/ws/canvases/${canvasId}/`,
		)
		setChatSocket(newSocket)
	}, [canvasId])

	// useEffect(() => {
	// 	if (chatSocket) {
	// 		// 메시지 수신 처리
	// 		chatSocket.onmessage = (e) => {
	// 			var data = JSON.parse(e.data)
	// 			// console.log(data.type)
	// 			if (data.type === 'resize') {
	// 				const updatedComponentList = componentList.map((component) => {
	// 					if (component.component_id === data.component_id) {
	// 						return {
	// 							...component,
	// 							position_x: data.position_x,
	// 							position_y: data.position_y,
	// 							width: data.width,
	// 							height: data.height,
	// 						}
	// 					}
	// 					return component
	// 				})
	// 				setComponentList(updatedComponentList)
	// 			} else if (data.type === 'position') {
	// 				const updatedComponentList = componentList.map((component) => {
	// 					if (component.component_id === data.component_id) {
	// 						return {
	// 							...component,
	// 							position_x: data.position_x,
	// 							position_y: data.position_y,
	// 						}
	// 					}
	// 					return component
	// 				})
	// 				setComponentList(updatedComponentList)
	// 			} else if (data.type === 'rotate') {
	// 				const updatedComponentList = componentList.map((component) => {
	// 					if (component.component_id === data.component_id) {
	// 						return {
	// 							...component,
	// 							position_x: data.position_x,
	// 							position_y: data.position_y,
	// 							rotate: data.rotate,
	// 						}
	// 					}
	// 					return component
	// 				})
	// 				setComponentList(updatedComponentList)
	// 			} else if (data.type === 'add') {
	// 				if (data.component_type === 'sticker') {
	// 					console.log(data.type)
	// 					console.log(componentList)

	// 					// Check if the component already exists
	// 					const existingComponent = componentList.find(
	// 						(component) => component.component_id === data.component_id,
	// 					)

	// 					if (!existingComponent) {
	// 						// If the component does not exist, create a new one
	// 						const newComponent = {
	// 							component_id: data.component_id,
	// 							component_url: data.component_url,
	// 							position_x: 406,
	// 							position_y: 206,
	// 							width: 100,
	// 							height: 100,
	// 							rotate: 0,
	// 						}
	// 						const updatedComponentList = [...componentList, newComponent]
	// 						setComponentList(updatedComponentList)
	// 					}
	// 				} else if (data.component_type === 'background') {
	// 					const newBackground = data.component_url
	// 					setBackgroundURL(newBackground)
	// 				}
	// 			} else if (data.type === 'remove') {
	// 				const updatedComponentList = componentList.filter(
	// 					(component) => component.component_id !== data.component_id,
	// 				)
	// 				setComponentList(updatedComponentList)
	// 			}
	// 		}
	// 	}
	// }, [chatSocket, componentList, backgroundURL])

	return (
		<div
			ref={canvasRef}
			className="flex items-center h-full justify-center w-screen bg-[#F0F1F3]"
		>
			<div
				id="board"
				className="overflow-hidden bg-white relative w-[912px] h-[513px] border-solid border-[1px] border-[#E7E8EA] shadow-sm"
				onClick={handleDeselect}
			>
				{backgroundURL && backgroundURL !== 'default_preview_url' && (
					<img
						src={backgroundURL}
						className="absolute w-[912px] h-[513px]"
						onClick={handleDeselect}
					/>
				)}
				{componentList.map(
					(element) =>
						element.component_id && (
							<div key={element.component_id} className="absolute">
								<div
									data-component-component_id={`element-${element.component_id}`}
									onClick={() => handleElementClick(element.component_id)}
									className="relative"
									style={{
										width: `${element.width}px`,
										height: `${element.height}px`,
										transform: `translate(${element.position_x}px, ${element.position_y}px) rotate(${element.rotate}deg)`,
										position: 'absolute',
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
										target={`[data-component-component_id='element-${element.component_id}']`}
										draggable={true}
										throttleDrag={1}
										edgeDraggable={false}
										startDragRotate={0}
										throttleDragRotate={0}
										// scalable={true}
										resizable={true}
										keepRatio={true}
										throttleScale={0}
										renderDirections={[
											'nw',
											'n',
											'ne',
											'w',
											'e',
											'sw',
											's',
											'se',
										]}
										rotatable={true}
										throttleRotate={0}
										rotationPosition={'top'}
										onDrag={(e) => {
											const element = componentList.find(
												(comp) => comp.component_id === selectedElement,
											)
											if (element) {
												element.position_x = e.beforeTranslate[0]
												element.position_y = e.beforeTranslate[1]
												e.target.style.transform = e.transform
												updateComponent(element)
											}
											// chatSocket?.send(
											// 	JSON.stringify({
											// 		type: 'position',
											// 		user_id: localStorage.getItem('user_id'),
											// 		component_id: element?.component_id,
											// 		position_x: element?.position_x,
											// 		position_y: element?.position_y,
											// 	}),
											// )
										}}
										onRotate={(e) => {
											const element = componentList.find(
												(comp) => comp.component_id === selectedElement,
											)
											if (element) {
												element.rotate = e.beforeRotate
												element.position_x = e.drag.beforeTranslate[0]
												element.position_y = e.drag.beforeTranslate[1]
												e.target.style.transform = e.drag.transform
												updateComponent(element)
											}
											// chatSocket?.send(
											// 	JSON.stringify({
											// 		type: 'rotate',
											// 		user_id: localStorage.getItem('user_id'),
											// 		component_id: element?.component_id,
											// 		position_x: element?.position_x,
											// 		position_y: element?.position_y,
											// 		rotate: element?.rotate,
											// 	}),
											// )
										}}
										onResize={(e) => {
											const element = componentList.find(
												(comp) => comp.component_id === selectedElement,
											)
											if (element) {
												element.position_x = e.drag.beforeTranslate[0]
												element.position_y = e.drag.beforeTranslate[1]
												element.width = e.width
												element.height = e.height
												e.target.style.width = `${e.width}px`
												e.target.style.height = `${e.height}px`
												e.target.style.transform = e.drag.transform
												updateComponent(element)
											}
											// chatSocket?.send(
											// 	JSON.stringify({
											// 		type: 'resize',
											// 		user_id: localStorage.getItem('user_id'),
											// 		component_id: element?.component_id,
											// 		position_x: element?.position_x,
											// 		position_y: element?.position_y,
											// 		width: element?.width,
											// 		height: element?.height,
											// 	}),
											// )
										}}
									/>
								)}
							</div>
						),
				)}
			</div>
		</div>
	)
})
