import { useNavigate } from 'react-router-dom'
import Button from './Button'
import hamburger from '/images/svg/hamburger.svg'
import exit from '/images/svg/exit.svg'

enum Menu {
	'내 캔버스',
	'초대하기',
	'배경 업로드',
	'AI 배경',
	'추천 배경',
	'AI 스티커',
	'히스토리',
}

type MenuBarProps = {
	selectedMenu: string
	handleMenuBarClick: () => void
	setSelectedMenu: (menu: string) => void
}

export default function MenuBar({
	selectedMenu,
	handleMenuBarClick,
	setSelectedMenu,
}: MenuBarProps) {
	const navigate = useNavigate()
	const userId = localStorage.getItem('user_id')

	const handleButtonClick = (menu: string) => {
		setSelectedMenu(menu)
	}

	const handleExitClick = () => {
		navigate(`/main/${userId}`)
	}

	return (
		<div className="h-full grow flex flex-col items-center justify-around w-[75px] border-r-[1px] border-solid border-[#E7E8EA] shadow-sm">
			<button
				onClick={handleMenuBarClick}
				className="flex flex-col items-center justify-center mt-6 mb-2"
			>
				<img src={hamburger} alt="menu" className="w-5" />
			</button>
			{Object.values(Menu).map((menu, index) => {
				if (typeof menu === 'string') {
					return (
						<Button
							key={index}
							name={menu}
							selectedMenu={selectedMenu}
							handleButtonClick={handleButtonClick}
						/>
					)
				}
			})}
			<button
				type="button"
				className="flex flex-col items-center hover:bg-slate-200 py-[8px] w-[90%] rounded-xl"
				onClick={handleExitClick}
			>
				<img src={exit} alt="exit" className="w-5" />
				<p className="text-[12px] mt-[10px]">나가기</p>
			</button>
		</div>
	)
}
