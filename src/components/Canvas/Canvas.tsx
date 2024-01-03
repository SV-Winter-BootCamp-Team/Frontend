import { CanvasDataType } from '../../pages/MainPage'

export default function Canvas({ canvas_name, update_at }: CanvasDataType) {
	return (
		<div className="flex-col">
			<div className="flex justify-center py-32 border-2 px-28 sm:py-28">
				<p>Viewer</p>
			</div>
			<div>{canvas_name}</div>
			<div>{update_at}</div>
		</div>
	)
}
