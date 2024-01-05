import { CanvasPreviewProps } from '../../../pages/MainPage'

export default function CanvasPreview({
	content,
	canvas_name,
	update_at,
}: CanvasPreviewProps) {
	return (
		<div className="flex-col">
			<div className="flex justify-center px-32 py-32 border-2 sm:py-[100px]">
				<p>{content}</p>
			</div>
			<div>{canvas_name}</div>
			<div>{update_at}</div>
		</div>
	)
}
