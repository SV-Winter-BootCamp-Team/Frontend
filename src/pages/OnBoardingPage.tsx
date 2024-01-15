import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	return (
		<div className="bg-[#000] w-screen max-w-full h-fit overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px]">
				<div className="bg-[#00000066] w-full h-[70px] px-[30px] py-[15px]">
					<div className="text-white text-3xl">꾸며Zoom</div>
				</div>
			</header>
			<OnBoardingTemplate />
		</div>
	)
}
