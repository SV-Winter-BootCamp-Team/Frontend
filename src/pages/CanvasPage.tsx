import NavBar from '../components/NavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import { useState } from 'react'

export default function CanvasPage() {
	const [isOpen, setIsOpen] = useState(false)

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<NavBar />
			<div className="flex">
				<MenuBar isOpen={isOpen} handleMenuBarClick={handleMenuBarClick} />
				<Canvas isOpen={isOpen} />
			</div>
		</>
	)
}
