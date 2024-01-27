import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px] flex justify-between text-white bg-[#fff] px-[30px] py-[15px] border-gray-200 border-b-[1px]">
				<div className="font-jua text-[#60c0d0] text-4xl">꾸며Zoom</div>
				<div>
					<div className="flex font-sans font-normal text-white">
						<button
							className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white"
							onClick={() => {
								window.location.replace('/signup')
							}}
						>
							회원가입
						</button>
						<button
							className="rounded-lg py-[11px] px-5 text-[13px] flex items-center bg-cyan-50 text-[#60c0d0] active:bg-cyan-600 hover:bg-[#60c0d0] hover:text-white"
							onClick={() => {
								window.location.replace('/login')
							}}
						>
							로그인
						</button>
					</div>
				</div>
			</header>
			<OnBoardingTemplate />
		</div>
	)
}
