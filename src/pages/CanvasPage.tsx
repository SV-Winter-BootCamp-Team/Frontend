import NavBar from '../components/CanvasPage/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import { useState } from 'react'
import MenuSection from '../components/CanvasPage/MenuSection'

export type MoveableElement = {
	id: string
	src: string
	x: number
	y: number
	// Add other properties like width, height, rotation, etc.
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
			x: 0, // Initial position, update as needed
			y: 0, // Initial position, update as needed
		}
		setComponentList([...componentList, newElement])
	}

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex flex-grow h-full bg-slate-400">
				<div className="flex bg-white">
					<MenuBar
						isOpen={isOpen}
						handleMenuBarClick={handleMenuBarClick}
						setSelectedMenu={setSelectedMenu}
					/>
					{selectedMenu && (
						<MenuSection
							isOpen={isOpen}
							menu={selectedMenu}
							setBackgroundURL={setBackgroundURL}
							handleAddComponent={handleAddComponent}
						/>
					)}
				</div>
				<Canvas backgroundURL={backgroundURL} componentList={componentList} />
			</div>
		</div>
	)
}
