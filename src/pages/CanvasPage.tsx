import CanvasNavBar from '../components/CanvasPage/CanvasNavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import { useState } from 'react'

export default function CanvasPage() {
	const [isOpen, setIsOpen] = useState(false)

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<CanvasNavBar />
			<div className="flex flex-grow bg-slate-400">
				<MenuBar isOpen={isOpen} handleMenuBarClick={handleMenuBarClick} />
				<Canvas isOpen={isOpen} />
			</div>
		</div>
	)
}
