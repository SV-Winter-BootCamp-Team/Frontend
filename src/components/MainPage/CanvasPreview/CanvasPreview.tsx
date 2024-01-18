import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CanvasPreviewProps } from '../../../pages/MainPage'
import axios from 'axios'

export type EditNameType = {
	[index: string]: string | number
	canvas_id: number
	canvas_name: string
}

export default function CanvasPreview({
	canvas_id,
	content,
	canvas_name,
	update_at,
}: CanvasPreviewProps) {
	const nav = useNavigate()
	const [hide, setHide] = useState(false)
	const [newName, setNewName] = useState(canvas_name)
	const [editName, setEditName] = useState<EditNameType>({
		canvas_id: canvas_id,
		canvas_name: canvas_name,
	})

	function deleteCanvas() {
		axios
			.delete(`http://localhost:8000/api/v1/canvases/${canvas_id}/`)
			.then(() => {
				window.location.reload()
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setEditName((current) => {
			let nextState = current
			nextState['canvas_name'] = newName
			return nextState
		})
		axios
			.put(`http://localhost:8000/api/v1/canvases/${canvas_id}/`, {
				canvas_name: newName,
			})
			.then(() => {
				window.location.reload()
			})
			.catch((error) => {
				alert(error.response.data.message)
				console.error(error)
				console.log(editName)
			})
	}

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
				<div
					className="absolute top-0 left-0 w-full h-full cursor-pointer"
					onClick={() =>
						nav({
							pathname: `/canvas/${canvas_id}`,
						})
					}
				/>
				<button
					className={`absolute top-0 right-0 ml-44 text-white ${
						!hide && 'hidden'
					}`}
					onClick={deleteCanvas}
				>
					❌
				</button>
			</div>
			<form onSubmit={onSubmit}>
				<input
					className="text-ellipsis"
					onChange={(e) => setNewName(e.target.value)}
					value={newName}
				/>
			</form>
			<div>{update_at}</div>
		</div>
	)
}
