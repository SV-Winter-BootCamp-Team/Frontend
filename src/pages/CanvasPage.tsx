import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

import NavBar from '../components/CanvasPage/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import MenuSection from '../components/CanvasPage/MenuSection'
import axios from 'axios'
import { useParams } from 'react-router'

export type MoveableElement = {
	id: string
	src: string
	x: number
	y: number
}

export default function CanvasPage() {
	const params = useParams<{ canvas_id: string }>()
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')

	const [backgroundURL, setBackgroundURL] = useState<string>('')

	const [componentList, setComponentList] = useState<MoveableElement[]>([])

	const [canvasName, setCanvasName] = useState<string>('')

	const handleAddComponent = (componentURL: string) => {
		const newElement: MoveableElement = {
			id: `element-${Date.now()}`,
			src: componentURL,
			x: 406,
			y: 206,
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

	useEffect(() => {
		const fetchCanvasDetails = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/v1/canvases/detail/${params.canvas_id}/`,
				)
				setCanvasName(response.data.result.canvas_name)
				setComponentList(response.data.result.components)
				console.log(response.data.result.canvas_name)
				console.log(response.data.result.components)
			} catch (error) {
				console.error('Error fetching canvas details:', error)
			}
		}

		fetchCanvasDetails()
	}, [])

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
