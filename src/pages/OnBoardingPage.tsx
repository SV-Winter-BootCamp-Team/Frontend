import { useNavigate } from 'react-router-dom'
import OnBoardingTemplate from '../components/OnBoarding'
import NavBar from '../components/General/NavBar'
import { ButtonProps } from '../components/General/NavBar/Button'

export default function OnBoardingPage() {
	const nav = useNavigate()
	const buttons: ButtonProps[] = [
		{
			text: '로그인',
			handleClickButton: () => {
				nav({
					pathname: '/login',
				})
			},
			hoverBackgroundColor: 'hover:bg-[#60c0d0]',
			activeBackgroundColor: 'active:bg-cyan-600',
			hoverTextColor: 'hover:text-white',
		},
		{
			text: '회원가입',
			handleClickButton: () => {
				nav({
					pathname: '/signup',
				})
			},
			hoverBackgroundColor: 'hover:bg-[#60c0d0]',
			activeBackgroundColor: 'active:bg-cyan-600',
			hoverTextColor: 'hover:text-white',
		},
	]
	return (
		<div className="w-screen max-w-full overflow-hidden">
			<div className="fixed top-0 z-10 w-full">
				<NavBar
					buttons={buttons}
					backgroundColor="bg-[#fff]"
					textColor="text-[#60c0d0]"
				/>
			</div>
			<OnBoardingTemplate />
		</div>
	)
}
