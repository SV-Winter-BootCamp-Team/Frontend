import React, { useRef, useState } from 'react'
import plus from '../../../../public/images/svg/plus.svg'

export default function ColorPicker() {
	const colorInputRef = useRef<HTMLInputElement>(null)
	const [color, setColor] = useState<string>('')

	const handleButtonClick = () => {
		colorInputRef.current?.click()
	}
	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = event.target.value
		setColor(newColor)
		console.log('Selected Color:', newColor)
	}

	return (
		<button
			type="button"
			id="color-picker"
			style={{ backgroundColor: color }}
			onClick={handleButtonClick}
			className="flex items-center justify-center w-8 h-8"
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
