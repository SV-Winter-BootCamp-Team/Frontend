import UploadButton from './UploadButton'
import history from '/images/svg/history.svg'

export type UploadProps = {
	setImageURL: (imageURL: string) => void
}

export default function Upload({ setImageURL }: UploadProps) {
	return (
		<div className="flex flex-col items-center">
			<div>
				<UploadButton setImageURL={setImageURL} />
			</div>
			<div className="mt-8">
				<div className="flex items-center mb-4">
					<img src={history} alt="background" className="w-5" />
					<p className="ml-1">내 배경들</p>
				</div>
				<div className="grid grid-cols-2 gap-x-5 gap-y-5">
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
				</div>
			</div>
		</div>
	)
}
