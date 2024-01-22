import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

import NavBar from '../components/CanvasPage/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import MenuSection from '../components/CanvasPage/MenuSection'
import axios from 'axios'
import { useParams } from 'react-router'

export type Component = {
	component_id: number
	component_url: string
	position_x: number
	position_y: number
	width: number
	height: number
	rotate: number
}

export default function CanvasPage() {
	const params = useParams<{ canvas_id: string }>()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')

	const [backgroundURL, setBackgroundURL] = useState<string>('')

	const [componentList, setComponentList] = useState<Component[]>([])

	const [canvasName, setCanvasName] = useState<string>('')

	const [canvasPreviewURL, setCanvasPreviewURL] = useState<string>('')
	const [socket, setSocket] = useState<WebSocket | null>(null)

	const [position_x] = useState<number>(406)
	const [position_y] = useState<number>(206)
	const [width] = useState<number>(100)
	const [height] = useState<number>(100)
	const [rotate] = useState<number>(0)

	const updateComponent = (updatedComponent: Component) => {
		setComponentList((prevList) =>
			prevList.map((component) =>
				component.component_id === updatedComponent.component_id
					? { ...component, ...updatedComponent }
					: component,
			),
		)
	}

	const handleSaveCanvas = async () => {
		try {
			// 캔버스 캡처
			const canvasElement = document.getElementById('board')
			if (canvasElement) {
				const canvasImage = await html2canvas(canvasElement, {
					useCORS: true,
					scale: 2,
				})
				const image = canvasImage.toDataURL('image/png', 1.0)
				setCanvasPreviewURL(image)
			}

			const res = await fetch(canvasPreviewURL)
			const blob = await res.blob()

			const formData = new FormData()
			formData.append('components', JSON.stringify(componentList))

			formData.append('canvas_preview_url', blob)

			await axios.put(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/save/`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)
		} catch (error) {
			console.error('Error saving canvas:', error)
		}
	}

	const handleAddComponent = async (componentURL: string) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/stickers/ai/select/`,
				{
					selected_url: componentURL,
				},
			)
			const component = response.data.result.component
			console.log(position_x, position_y, width, height, rotate)
			const newComponent = {
				component_id: component.component_id,
				component_url: componentURL,
				position_x: position_x,
				position_y: position_y,
				width: width,
				height: height,
				rotate: rotate,
			}

			setComponentList([...componentList, newComponent])
			socket?.send(
				JSON.stringify({
					type: 'add',
					user_id: localStorage.getItem('user_id'),
					component_id: newComponent.component_id,
					component_url: newComponent.component_url,
					component_type: 'sticker',
				}),
			)
		} catch (error) {
			console.error('Error saving sticker:', error)
		}
	}

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	const captureCanvas = async () => {
		const canvasElement = document.getElementById('board')
		if (canvasElement) {
			const canvasImage = await html2canvas(canvasElement, {
				useCORS: true,
				scale: 4,
			})

			const image = canvasImage.toDataURL('image/png', 1.0)
			setCanvasPreviewURL(image)
			const downloadLink = document.createElement('a')
			downloadLink.href = image
			downloadLink.download = 'captured-canvas.png'

			downloadLink.click()
		}
	}

	const fetchCanvasDetails = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/v1/canvases/detail/${params.canvas_id}/`,
			)
			const fetchedCanvasData = response.data.result

			setCanvasName(fetchedCanvasData.canvas_name)

			setBackgroundURL(fetchedCanvasData.background.component_url)

			setComponentList(
				fetchedCanvasData.sticker.map(
					({
						id,
						component_type,
						position_x,
						position_y,
						width,
						height,
						rotate,
						...rest
					}: {
						id: string
						component_type: string
						position_x: number
						position_y: number
						width: number
						height: number
						rotate: number
					}) => ({
						component_id: id,
						position_x,
						position_y,
						width,
						height,
						rotate,
						...rest,
					}),
				),
			)

			if (fetchedCanvasData.background) {
				setBackgroundURL(fetchedCanvasData.background.component_url)
			}
		} catch (error) {
			console.error('Error fetching canvas details:', error)
		}
	}

	useEffect(() => {
		fetchCanvasDetails()
		const newSocket = new WebSocket(
			'ws://' + 'localhost:8000' + '/ws/canvases/' + params.canvas_id + '/',
		) // Adjust the URL to your WebSocket server
		setSocket(newSocket)
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar
				captureCanvas={captureCanvas}
				canvasName={canvasName}
				handleSaveCanvas={handleSaveCanvas}
			/>
			<div className="flex flex-grow" style={{ height: 'calc(100vh - 55px)' }}>
				<div className="flex h-full bg-white">
					<MenuBar
						selectedMenu={selectedMenu}
						handleMenuBarClick={handleMenuBarClick}
						setSelectedMenu={setSelectedMenu}
					/>
					{selectedMenu && (
						<MenuSection
							isOpen={isOpen}
							seletedMenu={selectedMenu}
							setBackgroundURL={setBackgroundURL}
							handleAddComponent={handleAddComponent}
						/>
					)}
				</div>
				<Canvas
					backgroundURL={backgroundURL}
					componentList={componentList}
					setComponentList={setComponentList}
					updateComponent={updateComponent}
					setBackgroundURL={setBackgroundURL}
				/>
			</div>
		</div>
	)
}
