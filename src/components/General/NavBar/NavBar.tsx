import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { ButtonProps } from '../../General/NavBar/Button'

type NavBarProps = {
	buttons: ButtonProps[]
	text?: string
	backgroundColor: string
	textColor: string
}

export default function NavBar({
	buttons,
	text,
	backgroundColor,
	textColor,
}: NavBarProps) {
	const nav = useNavigate()

	return (
		<div
			className={`w-full h-[70px] flex justify-between ${textColor} ${backgroundColor} pl-4 items-center border-gray-200 border-b-[1px]`}
		>
			<div className="flex gap-[10px] pt-[5px]">
				<img
					className="h-8 mt-0.5 aspect-squre"
					src="/images/svg/favicon-white.svg"
				/>
				<div
					className="text-4xl cursor-pointer font-jua"
					onClick={() => {
						nav({
							pathname: '/',
						})
					}}
				>
					꾸며Zoom
				</div>
			</div>
			<p className="text-black">{text}</p>
			<div className="flex mr-4">
				{buttons.map((button, index) => (
					<Button
						key={index}
						text={button.text}
						handleClickButton={button.handleClickButton}
						hoverBackgroundColor={button.hoverBackgroundColor}
						activeBackgroundColor={button.activeBackgroundColor}
						hoverTextColor={button.hoverTextColor}
					/>
				))}
			</div>
		</div>
	)
}
