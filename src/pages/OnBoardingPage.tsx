import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px]">
				<div className="bg-[#00000066] w-full h-[70px] px-[30px] py-[15px]">
					<div className="text-white font-jua text-4xl">꾸며Zoom</div>
				</div>
			</header>
			<OnBoardingTemplate />
		</div>
	)
}
