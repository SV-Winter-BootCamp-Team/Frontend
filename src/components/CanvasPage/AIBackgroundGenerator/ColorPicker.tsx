import React, { useRef } from 'react'
import plus from '/images/svg/plus.svg'

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
		<div className="flex items-center justify-center border-solid rounded-sm w-9 h-9">
			<button
				type="button"
				id="color-picker"
				style={{ backgroundColor: color }}
				onClick={handleButtonClick}
				className="flex items-center justify-center w-8 h-8 rounded-sm border-solid border-[1px] border-gray-300"
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
		</div>
	)
}
