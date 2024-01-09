import UploadButton from './UploadButton'

export type UploadProps = {
	setImageURL: (imageURL: string) => void
}

export default function Upload({ setImageURL }: UploadProps) {
	return (
		<div className="flex justify-center">
			<UploadButton setImageURL={setImageURL} />
		</div>
	)
}
