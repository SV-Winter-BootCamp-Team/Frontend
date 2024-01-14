import Button from './Button'
import hamburger from '/images/svg/hamburger.svg'
import exit from '/images/svg/exit.svg'
import { useNavigate } from 'react-router-dom'

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
	isOpen: boolean
	handleMenuBarClick: () => void
	setSelectedMenu: (menu: string) => void
}

export default function MenuBar({
	handleMenuBarClick,
	setSelectedMenu,
}: MenuBarProps) {
	const navigate = useNavigate()
	const userId = 'yourUserId' // 실제 사용자 ID로 대체

	const handleButtonClick = (menu: string) => {
		setSelectedMenu(menu)
		
	}

	const handleExitClick = () => {
		navigate(`/main/${userId}`)
	}

	return (
		<div className="grow flex flex-col items-center w-16 border-r-[1px] border-solid border-[#E7E8EA]">
			<button
				onClick={handleMenuBarClick}
				className="flex flex-col items-center justify-center mt-8 mb-3"
			>
				<img src={hamburger} alt="menu" />
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
			<button
				type="button"
				className="flex flex-col items-center my-4"
				onClick={handleExitClick}
			>
				<img src={exit} alt="exit" className="w-6" />
				<p className="text-[12px] mt-[6px]">나가기</p>
			</button>
		</div>
	)
}
