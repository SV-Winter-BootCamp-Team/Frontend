import download from '/images/svg/download.svg'

type NavBarProps = {
	captureCanvas: () => void
	canvasName: string
	handleSaveCanvas: () => void
}

export default function NavBar({
	captureCanvas,
	canvasName,
	handleSaveCanvas,
}: NavBarProps) {
	return (
		<div className="flex items-center justify-center relative h-[55px] px-3.5 border-solid border-b-[1px] border-[#E7E8EA]">
			<p className="text-lg">{canvasName}</p>
			<button
				onClick={handleSaveCanvas}
				className="absolute right-[100px] flex px-3 py-2 mr-4 bg-[#66cae1] rounded-lg text-sm text-white"
			>
				저장하기
			</button>
			<button
				onClick={captureCanvas}
				className="absolute right-0 flex px-3 py-2 mr-4 bg-[#66cae1] rounded-lg items-center"
			>
				<img src={download} alt="download" className="w-3" />
				<p className="ml-2 text-sm text-white">다운로드</p>
			</button>
		</div>
	)
}
