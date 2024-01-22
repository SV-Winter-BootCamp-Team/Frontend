import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px]">
				<div className="font-jua flex justify-between text-white bg-[#fff] w-full h-[70px] px-[30px] py-[15px]">
					<div className="text-[#60c0d0] text-4xl">꾸며Zoom</div>
					<div>
						<button
							className="bg-[#60c0d0] rounded-lg py-1 px-3 text-lg mx-4"
							onClick={() => {
								window.location.replace('/signup')
							}}
						>
							Signup
						</button>
						<button
							className="bg-[#60c0d0] rounded-lg py-1 px-3 text-lg"
							onClick={() => {
								window.location.replace('/login')
							}}
						>
							Login
						</button>
					</div>
				</div>
			</header>
			<OnBoardingTemplate />
		</div>
	)
}
