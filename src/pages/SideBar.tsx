export default function SideBar() {
	return (
		<div className="w-1/6 z-50 fixed top w-1/5 h-full flex flex-col justify-between border-gray-200 border-r-[1px]">
			<div className="text-4xl text-[#66CAD1] font-jua mt-8 ml-6">꾸며Zoom</div>
			<div>
				<div className="flex flex-col w-fit gap-2 font-sans font-normal text-white mb-32 ml-4">
					<button
						className="rounded-lg py-[11px] px-5 text-[13px] flex items-center bg-cyan-50 text-[#66CAD1] active:bg-cyan-600 hover:bg-[#66CAD1] hover:text-white"
						onClick={() => {
							window.location.replace('/signup')
						}}
					>
						회원가입
					</button>
					<button
						className="rounded-lg py-[11px] px-5 text-[13px] flex items-center bg-cyan-50 text-[#66CAD1] active:bg-cyan-600 hover:bg-[#66CAD1] hover:text-white"
						onClick={() => {
							window.location.replace('/login')
						}}
					>
						로그인
					</button>
				</div>
			</div>
		</div>
	)
}
