import { useState } from 'react'
import { CanvasPreviewProps } from '../../../pages/MainPage'

export default function CanvasPreview({
	content,
	canvas_name,
	update_at,
}: CanvasPreviewProps) {
	const [hide, setHide] = useState(false)
	const [changeName, setChangeName] = useState(canvas_name)

	return (
		<div className="flex-col">
			<div
				className="relative flex justify-center px-32 py-32 border-2 sm:py-[100px]"
				onMouseEnter={() => {
					setHide(true)
				}}
				onMouseLeave={() => {
					setHide(false)
				}}
			>
				<p>{content}</p>
				<button
					className={`absolute top-0 right-0 ml-44 text-white ${
						!hide && 'hidden'
					}`}
				>
					❌
				</button>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					console.log(changeName)
				}}
			>
				<input
					onChange={(e) => setChangeName(e.target.value)}
					value={changeName}
				/>
			</form>
			<div>{update_at}</div>
		</div>
	)
}
