import { useState } from 'react'
import Button from './Button'
import MenuSection from '../MenuSection'

enum Menu {
	'내 캔버스',
	'초대하기',
	'배경 업로드',
	'AI 배경',
	'AI 스티커',
}

type MenuBarProps = {
	isOpen: boolean
	handleMenuBarClick: () => void
}

export default function MenuBar({ isOpen, handleMenuBarClick }: MenuBarProps) {
	const [selectedMenu, setSelectedMenu] = useState<string>('내 캔버스')

	const handleButtonClick = (menu: string) => {
		setSelectedMenu(menu)
	}

	return (
		<div className="flex">
			<div className="flex flex-col">
				<button
					onClick={handleMenuBarClick}
					className="flex flex-col items-center justify-center"
				>
					햄버거
				</button>
				{Object.values(Menu).map((menu, index) => {
					if (typeof menu === 'string') {
						return (
							<Button
								key={index}
								name={menu}
								icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
								handleButtonClick={handleButtonClick}
							/>
						)
					}
				})}
			</div>
			{selectedMenu && <MenuSection isOpen={isOpen} menu={selectedMenu} />}
		</div>
	)
}
