import { useNavigate } from 'react-router-dom'

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
				<div className="flex font-sans font-normal">
					<button
						className="bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center"
						onClick={handleSaveCanvas}
					>
						저장하기
					</button>
					<button
						className="bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white rounded-lg py-[11px] px-5 text-[13px] flex items-center"
						onClick={captureCanvas}
					>
						다운로드
					</button>
				</div>
			</div>
		</div>
	)
}
