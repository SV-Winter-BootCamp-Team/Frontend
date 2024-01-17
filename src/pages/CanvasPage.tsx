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
}

export default function CanvasPage() {
	const params = useParams<{ canvas_id: string }>()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')

	const [backgroundURL, setBackgroundURL] = useState<string>('')

	const [componentList, setComponentList] = useState<Component[]>([])

	const [canvasName, setCanvasName] = useState<string>('')

	const [canvasPreviewURL, setCanvasPreviewURL] = useState<string>('')

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

			// componentList 업데이트
			const updatedComponents = componentList.map((component) => {
				const element = document.getElementById(
					`component-${component.component_id}`,
				)
				if (element) {
					const rect = element.getBoundingClientRect()
					return {
						...component,
						position_x: rect.left,
						position_y: rect.top,
						width: rect.width,
						height: rect.height,
					}
				}
				return component
			})

			setComponentList(updatedComponents)

			console.log('updatedComponents!!!!!!!!!', updatedComponents)
			console.log('canvasPreview!!!!!!!!!', canvasPreviewURL)

			const response = await axios.put(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/save/`,
				{
					components: updatedComponents,
					canvas_preview_url: canvasPreviewURL,
				},
			)

			console.log(response.data)
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
			console.log(response.data)
			const component = response.data.result.component
			console.log(component)
			const newComponent = {
				component_id: component.component_id,
				component_url: componentURL,
				position_x: 406,
				position_y: 206,
				width: 100,
				height: 100,
			}
			setComponentList([...componentList, newComponent])
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
			console.log(image)
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

			setComponentList(
				fetchedCanvasData.sticker.map(
					({
						id,
						component_type,
						...rest
					}: {
						id: string
						component_type: string
					}) => ({
						component_id: id,
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
	}, [params.canvas_id])

	console.log(canvasName)
	console.log('back!!', backgroundURL)
	console.log(componentList)

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
				/>
			</div>
		</div>
	)
}
