import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CanvasPreviewProps } from '../../../pages/MainPage'
import axios from 'axios'
import trashCan from '/images/svg/trashcan.svg'

export type EditNameType = {
	[index: string]: string | number
	canvas_id: number
	canvas_name: string
}

export type TimeType = {
	year: string
	month: string
	day: string
	hour: string
	minute: string
}

export default function CanvasPreview({
	canvas_id,
	canvas_preview_url,
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

	const updateAt: TimeType = {
		year: update_at.substr(0, 4),
		month: update_at.substr(5, 2),
		day: update_at.substr(8, 2),
		hour: update_at.substr(11, 2),
		minute: update_at.substr(14, 2),
	}
	const now = new Date()
	const timeNow: TimeType = {
		year: String(now.getFullYear()),
		month: String(now.getMonth() + 1).padStart(2, '0'),
		day: String(now.getDate()).padStart(2, '0'),
		hour: String(now.getHours() - 9).padStart(2, '0'),
		minute: String(now.getMinutes()).padStart(2, '0'),
	}

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

	let showUpdate = '0 minutes ago'

	if (updateAt.year !== timeNow.year) {
		showUpdate = `${Number(timeNow.year) - Number(updateAt.year)} years ago`
	} else if (updateAt.month !== timeNow.month) {
		showUpdate = `${Number(timeNow.month) - Number(updateAt.month)} months ago`
	} else if (updateAt.day !== timeNow.day) {
		showUpdate = `${Number(timeNow.day) - Number(updateAt.day)} days ago`
	} else if (updateAt.hour !== timeNow.hour) {
		showUpdate = `${Number(timeNow.hour) - Number(updateAt.hour)} hours ago`
	} else if (updateAt.minute !== timeNow.minute) {
		showUpdate = `${Number(timeNow.minute) - Number(updateAt.minute)} minutes ago`
	}

	return (
		<div className="flex-col">
			<div
				className="relative flex justify-center px-32 py-32 border-2 sm:py-[100px] rounded-lg"
				onMouseEnter={() => {
					setHide(true)
				}}
				onMouseLeave={() => {
					setHide(false)
				}}
			>
				<img
					className={`absolute top-0 left-0 w-full h-full rounded-lg ${
						canvas_preview_url === 'default_preview_url' && 'hidden'
					}`}
					src={canvas_preview_url}
				/>
				<div
					className="absolute top-0 left-0 w-full h-full cursor-pointer"
					onClick={() =>
						nav({
							pathname: `/canvas/${canvas_id}`,
						})
					}
				/>
				<button
					className={`absolute top-3 right-3 ml-44 text-white ${
						!hide && 'hidden'
					}`}
					onClick={deleteCanvas}
				></button>
			</div>
			<div className="flex justify-between mx-4">
				<div>
					<form onSubmit={onSubmit}>
						<input
							className="text-ellipsis"
							onChange={(e) => setNewName(e.target.value)}
							value={newName}
						/>
					</form>
					<div className="text-sm text-gray-400">{showUpdate}</div>
				</div>
				<div className="h-6 aspect-square my-auto cursor-pointer">
					<img src={trashCan} onClick={deleteCanvas} />
				</div>
			</div>
		</div>
	)
}
