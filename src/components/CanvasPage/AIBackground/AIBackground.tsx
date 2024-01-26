import ReGenerateButton from '../../General/ReGenerateButton'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { changeBackground } from '../../../api/api'
import { ParamsType } from '../../../type'
import { useMutation } from '@tanstack/react-query'

type AIBackgroundProps = {
	setBackgroundStatus: (status: string) => void
	fetchBackgroundData: () => void
	backgroundList: string[]
	setBackgroundURL: (backgroundURL: string) => void
}

export default function AIBackground({
	setBackgroundStatus,
	fetchBackgroundData,
	backgroundList,
	setBackgroundURL,
}: AIBackgroundProps) {
	const params = useParams<{ canvas_id: string }>()
	const [socket, setSocket] = useState<WebSocket | null>(null)

	const { mutate: changeBackgroundMutate } = useMutation({
		mutationFn: (backgroundURL: string) =>
			changeBackground(params.canvas_id as ParamsType, backgroundURL),
		onSuccess: (component_id, backgroundURL) => {
			setBackgroundURL(backgroundURL)
			socket?.send(
				JSON.stringify({
					type: 'add',
					user_id: localStorage.getItem('user_id'),
					component_id: component_id,
					component_url: backgroundURL,
					component_type: 'background',
				}),
			)
		},
		onError: (error) => {
			console.log(error.message)
		},
	})

	useEffect(() => {
		const newSocket = new WebSocket(
			'ws://' + 'localhost:8000' + '/ws/canvases/' + params.canvas_id + '/',
		)
		setSocket(newSocket)
	}, [])

	return (
		<div className="flex flex-col items-center mt-8 grow">
			<div className="flex flex-col">
				{backgroundList.map((background, index) => (
					<img
						key={index}
						src={background}
						alt="background"
						onClick={() => {
							changeBackgroundMutate(background)
						}}
						className="w-[320px] h-[180px] mb-5 cursor-pointer rounded-md"
					/>
				))}
			</div>
			<div className="flex flex-col justify-end grow">
				<ReGenerateButton
					handleBackButtonClick={(status) => setBackgroundStatus(status)}
					handleGenerateButtonClick={fetchBackgroundData}
				/>
			</div>
		</div>
	)
}
