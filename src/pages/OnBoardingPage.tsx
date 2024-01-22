import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px]">
				<div className="font-jua flex justify-between text-white bg-[#fff] w-full h-[70px] px-[30px] py-[15px]">
					<div className="text-[#60c0d0] text-4xl">꾸며Zoom</div>
					<div>
						<button
							className="bg-[#60c0d0] rounded-lg pt-1 pb-[2px] px-3 text-lg mx-4"
							onClick={() => {
								window.location.replace('/signup')
							}}
						>
							<span className="flex items-center">회원가입</span>
						</button>
						<button
							className="bg-[#60c0d0] rounded-lg pt-1 pb-[2px] px-3 text-lg"
							onClick={() => {
								window.location.replace('/login')
							}}
						>
							<span>로그인</span>
						</button>
					</div>
				</div>
			</header>
			<OnBoardingTemplate />
		</div>
	)
}
