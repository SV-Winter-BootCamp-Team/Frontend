type ThemeProps = {
	theme: string
	setTheme: (theme: string) => void
}

export default function Theme({ theme, setTheme }: ThemeProps) {
	const handleClick = () => {
		setTheme(theme)
	}
	return (
		<button
			type="button"
			onClick={handleClick}
			className="flex items-center justify-center mx-2 mt-4 bg-white border-[1px] border-gray-300 rounded-md boder-solid"
		>
			<p className="px-3 py-1.5 text-sm">{theme}</p>
		</button>
	)
}
