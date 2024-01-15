type ThemeProps = {
	theme: string
	setTheme: (theme: string) => void
	selectedTheme: string // 현재 선택된 테마를 나타내는 prop 추가
}

export default function Theme({ theme, setTheme, selectedTheme }: ThemeProps) {
	const handleClick = () => {
		setTheme(theme)
	}

	// 선택된 테마일 경우 테두리 색상을 파란색으로 설정
	const borderColor =
		theme === selectedTheme
			? 'border-[#66cae1] bg-cyan-50'
			: 'border-gray-300 bg-white'

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`flex items-center justify-center border-[1px] mx-1.5 mt-4 ${borderColor} rounded-md border-solid`}
		>
			<p className="px-3 py-1.5 text-sm">{theme}</p>
		</button>
	)
}
