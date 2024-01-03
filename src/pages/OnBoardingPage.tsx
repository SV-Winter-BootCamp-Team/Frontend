import OnBoardingTemplate from "../components/OnBoarding";

export default function OnBoardingPage() {
	return (
		<div>
            <header className="fixed top w-[100vw] h-[70px]">
				<div className="bg-[#00000066] w-[100vw] h-[70px] px-[30px] py-[15px]">
                	<div className="text-white text-3xl">꾸며Zoom</div>
				</div>
				{/* <div className="bg-gradient-to-b from-[#CB96EF] to-[#7AA1CD] h-[100vh] z-0" /> */}
            </header>
				<OnBoardingTemplate />
		</div>
	);
}

//className="bg-gradient-to-b from-[#CB96EF] to-[#7AA1CD] h-[100vh]"