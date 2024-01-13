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

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex flex-grow h-full">
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
				<Canvas
					backgroundURL={backgroundURL}
					componentList={componentList}
					setComponentList={setComponentList}
				/>
			</div>
		</div>
	)
}
