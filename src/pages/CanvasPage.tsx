import { useState } from 'react'
import html2canvas from 'html2canvas'

import NavBar from '../components/CanvasPage/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import MenuSection from '../components/CanvasPage/MenuSection'

export type MoveableElement = {
	id: string
	src: string
	x: number
	y: number
}

export default function CanvasPage() {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')

	const [backgroundURL, setBackgroundURL] = useState<string>('')

	const [componentList, setComponentList] = useState<MoveableElement[]>([])

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

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar captureCanvas={captureCanvas} />
			<div className="flex flex-grow h-full">
				<div className="flex bg-white">
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
