import mycanvas from '/images/svg/mycanvas.svg'
import invite from '/images/svg/invite.svg'
import backgroundupload from '/images/svg/backgroundupload.svg'
import aibackground from '/images/svg/aibackground.svg'
import recommendbackground from '/images/svg/recommendbackground.svg'
import aisticker from '/images/svg/aisticker.svg'
import history from '/images/svg/history.svg'

export type ButtonProps = {
	name: string
	selectedMenu: string
	handleButtonClick: (menu: string) => void
}

const menuIcons: { [key: string]: string } = {
	'내 캔버스': mycanvas,
	초대하기: invite,
	'배경 업로드': backgroundupload,
	'AI 배경': aibackground,
	'추천 배경': recommendbackground,
	'AI 스티커': aisticker,
	히스토리: history,
}

export default function Button({
	name,
	selectedMenu,
	handleButtonClick,
}: ButtonProps) {
	const icon = menuIcons[name]

	const buttonClass =
		name === selectedMenu
			? 'flex flex-col items-center justify-center py-[8px] my-2 w-[90%] rounded-xl bg-[#66cae1] opacity-80 text-white'
			: 'flex flex-col items-center justify-center py-[8px] my-2 w-[90%] hover:bg-slate-100 rounded-xl'

	const iconClass = name === selectedMenu ? 'w-5 h-5 icon' : 'w-5 h-5'
	return (
		<button
			type="button"
			className={buttonClass}
			onClick={() => handleButtonClick(name)}
		>
			<img src={icon} alt={name} className={iconClass} />
			<p className="text-[12px] mt-[8px]">{name}</p>
		</button>
	)
}
