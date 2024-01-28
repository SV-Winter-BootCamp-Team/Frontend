import OnBoardingTemplate from '../components/OnBoarding'
import SideBar from './SideBar'

export default function OnBoardingPage() {
	return (
		<div className="w-full flex max-w-full overflow-hidden">
			<div className="w-1/6">
				<SideBar />
			</div>
			<OnBoardingTemplate />
		</div>
	)
}
