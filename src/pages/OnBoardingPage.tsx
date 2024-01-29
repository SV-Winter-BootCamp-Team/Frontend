import { useNavigate } from 'react-router-dom'
import OnBoardingTemplate from '../components/OnBoarding'

export default function OnBoardingPage() {
	const nav = useNavigate()
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<header className="z-10 fixed top w-full h-[70px] flex justify-between text-white bg-[#fff] px-[30px] py-[15px] border-gray-200 border-b-[1px]">
				<div className="font-jua text-[#66CAD1] text-4xl">꾸며Zoom</div>
				<div>
					<div className="flex font-sans font-nomal text-white">
						<button
							className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#66CAD1] cative:bg-cyan-600 hover:bg-[#66CAD1] hover:text-white"
							onClick={() => {
								nav({
									pathname: '/signup',
								})
							}}
						>
							회원가입
						</button>
						<button
							className="rounded-lg py-[11px] px-5 text-[13px] mx-4 flex items-center bg-cyan-50 text-[#66CAD1] cative:bg-cyan-600 hover:bg-[#66CAD1] hover:text-white"
							onClick={() => {
								nav({
									pathname: '/login',
								})
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
