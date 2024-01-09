type ColorProps = {
	color: string
	setColor: (color: string) => void
}

export default function Color({ color, setColor }: ColorProps) {
	const handleClick = () => {
		setColor(color)
	}

	return (
		<button
			type="button"
			style={{ backgroundColor: color }}
			onClick={handleClick}
			className="flex items-center justify-center w-8 h-8 rounded-sm"
		>
			<p></p>
		</button>
	)
}
