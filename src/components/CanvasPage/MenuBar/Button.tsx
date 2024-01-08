export type ButtonProps = {
	name: string
	handleButtonClick: (menu: string) => void
}

const menuIcons: { [key: string]: string } = {
	'내 캔버스': '../../../../public/images/svg/mycanvas.svg',
	초대하기: '../../../../public/images/svg/invite.svg',
	'배경 업로드': '../../../../public/images/svg/backgroundupload.svg',
	'AI 배경': '../../../../public/images/svg/aibackground.svg',
	'AI 스티커': '../../../../public/images/svg/aisticker.svg',
	// 다른 메뉴 아이템에 대한 아이콘 경로도 추가...
}

export default function Button({ name, handleButtonClick }: ButtonProps) {
	const icon = menuIcons[name]
	return (
		<button
			className="flex flex-col items-center my-4 "
			onClick={() => handleButtonClick(name)}
		>
			<img src={icon} alt={name} className="w-6 h-6" />
			<p className="text-[12px]">{name}</p>
		</button>
	)
}
