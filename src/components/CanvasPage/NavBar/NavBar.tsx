import { useNavigate } from 'react-router-dom'
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
	const nav = useNavigate()
	return (
		<div className="w-full h-[70px] shadow-lg border-b-[1px]">
			<div className="font-jua flex justify-between items-center w-full px-[30px] py-[15px]">
				<div className="flex gap-3">
					<img
						className="h-[39px] aspect-squre"
						src="/images/svg/favicon.svg"
					/>
					<div
						className="text-[#60c0d0] text-4xl cursor-pointer"
						onClick={() => {
							nav({
								pathname: '/',
							})
						}}
					>
						꾸며Zoom
					</div>
				</div>
				<p className="font-sans font-medium text-gray-800 text-md">
					{canvasName}
				</p>
				<div className="flex text-white font-sans font-medium">
					<button
						className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white"
						onClick={handleSaveCanvas}
					>
						<span className="flex items-center">저장하기</span>
					</button>
					<button
						className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white"
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
