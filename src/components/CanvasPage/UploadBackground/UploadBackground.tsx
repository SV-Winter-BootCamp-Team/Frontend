import UploadButton from './UploadButton'

export type UploadProps = {
	setBackgroundURL: (backgoundURL: string) => void
}

export default function UploadBackground({ setBackgroundURL }: UploadProps) {
	return (
		<div className="flex flex-col">
			<div>
				<UploadButton setBackgroundURL={setBackgroundURL} />
			</div>
			<div className="flex flex-col mt-8 ml-8">
				<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
				<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
				<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
				<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
			</div>
		</div>
	)
}
