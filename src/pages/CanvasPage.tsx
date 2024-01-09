import CanvasNavBar from '../components/CanvasPage/CanvasNavBar'
import Canvas from '../components/CanvasPage/Canvas'
import MenuBar from '../components/CanvasPage/MenuBar'
import { useState } from 'react'
import MenuSection from '../components/CanvasPage/MenuSection'

export default function CanvasPage() {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')
	const [imageURL, setImageURL] = useState<string>('')

	const handleMenuBarClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex flex-col min-h-screen">
			<CanvasNavBar />
			<div className="flex flex-grow bg-slate-400">
				<div className="flex bg-orange-400">
					<MenuBar
						isOpen={isOpen}
						handleMenuBarClick={handleMenuBarClick}
						setSelectedMenu={setSelectedMenu}
					/>
					{selectedMenu && (
						<MenuSection
							isOpen={isOpen}
							menu={selectedMenu}
							setImageURL={setImageURL}
						/>
					)}
				</div>
				<Canvas isOpen={isOpen} backgroundImage={imageURL} />
			</div>
		</div>
	)
}
