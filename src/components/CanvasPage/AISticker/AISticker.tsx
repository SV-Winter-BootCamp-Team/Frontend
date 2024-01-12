import aisticker from '/images/svg/aisticker.svg'
import home from '/images/svg/home.svg'
import avator from '/images/svg/avator.svg'
import palette from '/images/svg/palette.svg'

export default function AISticker() {
	const imgList: string[] = [aisticker, home, avator, palette]

	const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const { clientX, clientY } = event
		const offsetX = clientX - event.currentTarget.getBoundingClientRect().left
		const offsetY = clientY - event.currentTarget.getBoundingClientRect().top
		event.dataTransfer.setData(
			'text/plain',
			JSON.stringify({ id: event.currentTarget.id, offsetX, offsetY }),
		)
	}

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const element = event.currentTarget.cloneNode(true) as HTMLDivElement
		const newId = `copy-${new Date().getTime()}`
		element.id = newId
		element.setAttribute('draggable', 'true')

		const board = document.getElementById('board')
		if (board) {
			board.appendChild(element)

			setTimeout(() => {
				const elementWidth = element.offsetWidth
				const elementHeight = element.offsetHeight

				const centerX = board.offsetWidth / 2 - elementWidth / 2
				const centerY = board.offsetHeight / 2 - elementHeight / 2

				element.style.position = 'absolute'
				element.style.left = `${centerX}px`
				element.style.top = `${centerY}px`

				element.style.resize = 'both'
				element.style.overflow = 'auto'
				element.style.aspectRatio = '1 / 1' // Ensure 1:1 aspect ratio during resizing

				element.addEventListener('dragstart', (e) => {
					onDragStart(e as unknown as React.DragEvent<HTMLDivElement>)
				})
			}, 0)
		}
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-6 my-7 mx-7">
				{imgList.map((img, index) => (
					<img
						src={img}
						key={index}
						id={`draggable-${index}`}
						draggable="false"
						onClick={handleClick}
						className="overflow-auto w-36 h-36 cursor-grab resize-both aspect-square"
					/>
				))}
			</div>
		</>
	)
}
