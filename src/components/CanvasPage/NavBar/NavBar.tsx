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
		<div className="w-full h-[70px] shadow-lg border-b-[1px]">
			<div className="font-jua flex justify-between items-center w-full px-[30px] py-[15px]">
				<div className="text-[#60c0d0] text-4xl">꾸며Zoom</div>
				<p className="font-sans font-medium text-gray-800 text-md">
					{canvasName}
				</p>
				<div className="flex text-white">
					<button
						className="bg-[#60c0d0] rounded-lg pt-1 pb-[2px] px-3 text-lg mx-4 flex items-center"
						onClick={handleSaveCanvas}
					>
						<span className="flex items-center">저장하기</span>
					</button>
					<button
						className="bg-[#60c0d0] rounded-lg pt-1 pb-[2px] px-3 text-lg flex items-center"
						onClick={captureCanvas}
					>
						<img src={download} alt="download" className="mr-2" />
						<span>다운로드</span>
					</button>
				</div>
			</div>
		</div>
	)
}
