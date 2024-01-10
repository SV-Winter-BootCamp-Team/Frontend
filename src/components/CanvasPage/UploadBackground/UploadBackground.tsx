import UploadButton from './UploadButton'
import history from '/images/svg/history.svg'

export type UploadProps = {
	setImageURL: (imageURL: string) => void
}

export default function UploadBackground({ setImageURL }: UploadProps) {
	return (
		<div className="flex flex-col items-center">
			<div>
				<UploadButton setImageURL={setImageURL} />
			</div>
			<div className="flex flex-col mt-8">
				<div className="flex items-center mb-4">
					<img src={history} alt="background" className="w-4" />
					<p className="ml-1">내 배경들</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
					<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
					<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
					<div className="w-[320px] bg-blue-300 h-[180px] mb-4">grid1</div>
				</div>
			</div>
		</div>
	)
}
