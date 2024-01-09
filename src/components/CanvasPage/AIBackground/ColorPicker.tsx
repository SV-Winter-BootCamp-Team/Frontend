import React, { useRef } from 'react'
import plus from '../../../../public/images/svg/plus.svg'

type ColorPickerProps = {
	color: string
	setColor: (color: string) => void
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
	const colorInputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		colorInputRef.current?.click()
	}
	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = event.target.value
		setColor(newColor)
	}

	return (
		<button
			type="button"
			id="color-picker"
			style={{ backgroundColor: color }}
			onClick={handleButtonClick}
			className="flex items-center justify-center w-8 h-8 rounded-sm"
		>
			<div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
				<img src={plus} alt="plus" />
			</div>
			<input
				type="color"
				value={color}
				onChange={handleColorChange}
				className="hidden"
				ref={colorInputRef}
			/>
		</button>
	)
}
