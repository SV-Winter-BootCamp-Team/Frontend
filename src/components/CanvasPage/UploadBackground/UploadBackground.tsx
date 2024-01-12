import UploadButton from './UploadButton'
import history from '/images/svg/history.svg'

export type UploadProps = {
	setImageURL: (imageURL: string) => void
}

export default function UploadBackground({ setImageURL }: UploadProps) {
	return (
		<div className="flex flex-col">
			<div>
				<UploadButton setImageURL={setImageURL} />
			</div>
			<div className="flex flex-col mt-8 ml-8">
				<div className="flex mb-4">
					<img src={history} alt="background" className="w-4" />
					<p className="ml-1">내 배경들</p>
				</div>
				<div className="flex flex-col">
					<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
					<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
					<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
					<div className="w-[304px] bg-blue-300 h-[171px] mb-4">grid1</div>
				</div>
			</div>
		</div>
	)
}
