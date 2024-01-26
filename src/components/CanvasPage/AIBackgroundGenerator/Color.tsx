import React from 'react'

type ColorProps = {
	color: string
	setColor: (color: string) => void
	selectedColor?: string
}

export default React.memo(function Color({
	color,
	setColor,
	selectedColor,
}: ColorProps) {
	const handleClick = () => {
		setColor(color)
	}

	const isSelected = color === selectedColor
	const buttonClasses = isSelected
		? 'border-white'
		: 'border-transparent hover:border-white'
	const divClasses = isSelected
		? 'border-[#66cae1]'
		: 'border-transparent hover:border-gray-300'

	return (
		<div
			className={`flex items-center justify-center w-9 h-9 border-[2px] rounded-md ${divClasses}`}
		>
			<button
				type="button"
				style={{ backgroundColor: color }}
				onClick={handleClick}
				className={`flex items-center justify-center w-8 h-8 box-border rounded-md border-2 ${buttonClasses}`}
			/>
		</div>
	)
})
