import { useState } from 'react'
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
	const [hide, setHide] = useState(false)
	const [newName, setNewName] = useState(canvas_name)
	const [editName, setEditName] = useState<EditNameType>({
		canvas_id: canvas_id,
		canvas_name: canvas_name,
	})

	function onClick() {
		axios
			.delete('http://localhost:8000/api/v1/canvases/{canvas_id}', {
				data: {
					canvas_id: canvas_id,
				},
			})
			.then((response) => {
				alert(response.data.message)
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
		console.log(editName)
		axios
			.put('http://localhost:8000/api/v1/canvases/{canvas_id}', editName)
			.then((response) => {
				alert(response.data.message)
			})
			.catch((error) => {
				alert(error.response.data.message)
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
				<button
					className={`absolute top-0 right-0 ml-44 text-white ${
						!hide && 'hidden'
					}`}
					onClick={onClick}
				>
					❌
				</button>
			</div>
			<form onSubmit={onSubmit}>
				<input onChange={(e) => setNewName(e.target.value)} value={newName} />
			</form>
			<div>{update_at}</div>
		</div>
	)
}
