import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

import NavBar from '../components/CanvasPage/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import MenuSection from '../components/CanvasPage/MenuSection'
import axios from 'axios'
import { useParams } from 'react-router'

export type Component = {
	id: string
	component_type: 'Background' | 'Component'
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

	const handleAddComponent = (componentURL: string) => {
		const newElement: Component = {
			component_type: 'Component',
			component_url: componentURL,
			id: `element-${Date.now()}`,
			position_x: 406,
			position_y: 206,
			width: 100,
			height: 100,
		}
		setComponentList([...componentList, newElement])
	}

	const handleApplyBackground = (backgroundURL: string) => {
		setBackgroundURL(backgroundURL)
	}

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	const captureCanvas = async () => {
		const canvasElement = document.getElementById('board')
		if (canvasElement) {
			const canvasImage = await html2canvas(canvasElement, {
				scale: 4,
			})

			const image = canvasImage.toDataURL('image/png', 1.0)

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

			setComponentList(fetchedCanvasData.sticker)

			if (fetchedCanvasData.background) {
				setBackgroundURL(fetchedCanvasData.background.component_url)
			}
		} catch (error) {
			console.error('Error fetching canvas details:', error)
		}
	}

	useEffect(() => {
		fetchCanvasDetails()
	}, [])

	console.log(canvasName)
	console.log('back!!', backgroundURL)
	console.log(componentList)

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar captureCanvas={captureCanvas} canvasName={canvasName} />
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
							handleApplyBackground={handleApplyBackground}
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
