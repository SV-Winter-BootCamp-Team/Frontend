import { Link } from 'react-router-dom'

export default function OnBoardingTemplate() {
	const images: string[] = [
		'onBoarding1',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
		'onBoarding2',
	]

	return (
		<div className="w-full overflow-hidden">
			<section className="w-full h-fit flex-col bg-gradient-to-b from-[#CB96EF] to-[#7AA1CD]">
				<div className="w-fit pt-[358px] mx-auto text-[#514958] text-[60px]">
					<h1>꾸며Zoom에서 당신만의 배경을 꾸며보세요</h1>
				</div>
				<div className="mt-28 w-fit mx-auto">
					<button className="bg-[#FFFFFF66] p-4 text-[#514958] text-5xl rounded-[25px]">
						<Link to="/signup">시작하기</Link>
					</button>
				</div>
				<div className="w-full">
					<div className="flex flex-row-reverse gap-[10px] mt-80 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
					<div className="flex flex-row gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-reverse_slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
					<div className="flex flex-row-reverse gap-[10px] mt-4 overflow-hidden">
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
						{images.map((image) => (
							<img
								className="w-[300px] animate-slider"
								alt={image}
								src={`public/images/svg/${image}.svg`}
							/>
						))}
					</div>
				</div>
				<div className="pt-24 w-fit mx-auto text-[#514958] text-5xl">
					<div>
						이미 수많은 사용자들이 매일 창의적인 작품들을 만들어내고 있습니다!
					</div>
				</div>
				<div className="w-fit pt-[163px] mx-auto text-[#514958] text-6xl mt-32">
					<div className="border-2 border-[#000000] border-dotted rounded-[25px] w-[700px] h-[600px]" />
				</div>
				<div className="w-fit mx-auto text-[#514958] text-5xl">
					<div>나만의 개성을 담은 배경을 직접 디자인할 수 있습니다</div>
				</div>
			</section>
		</div>
	)
}
