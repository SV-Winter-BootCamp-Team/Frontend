import { useState } from 'react'
import Button from './Button'
import ToolSection from './ToolSection'

export default function ToolBar() {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex">
			<div className="flex flex-col">
				<button
					onClick={handleClick}
					className="flex flex-col items-center justify-center"
				>
					햄버거
				</button>
				<Button
					name={'내 캔버스'}
					icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
				></Button>
				<Button
					name={'초대하기'}
					icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
				></Button>
				<Button
					name={'배경 업로드'}
					icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
				></Button>
				<Button
					name={'AI 배경'}
					icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
				></Button>
				<Button
					name={'AI 스티커'}
					icon={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
				></Button>
			</div>
			<ToolSection isOpen={isOpen}></ToolSection>
		</div>
	)
}
