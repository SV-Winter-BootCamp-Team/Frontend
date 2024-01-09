import Button from './Button'

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
	setSelectedMenu: (menu: string) => void
}

export default function MenuBar({
	isOpen,
	handleMenuBarClick,
	setSelectedMenu,
}: MenuBarProps) {
	const handleButtonClick = (menu: string) => {
		setSelectedMenu(menu)
	}

	return (
		<div className="flex flex-col items-center w-16">
			<button
				onClick={handleMenuBarClick}
				className="flex flex-col items-center justify-center mt-6 mb-2"
			>
				<img src="../../../../public/images/svg/hamburger.svg" alt="menu" />
			</button>
			{Object.values(Menu).map((menu, index) => {
				if (typeof menu === 'string') {
					return (
						<Button
							key={index}
							name={menu}
							handleButtonClick={handleButtonClick}
						/>
					)
				}
			})}
		</div>
	)
}
