export type ImageType = {
	key: number
	src: string
	alt: string
}

export default function ImageSlider() {
	const images1: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example01.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example02.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example03.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example04.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example05.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example06.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example07.svg',
			alt: 'onBoarding2',
		},
	]
	const images2: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example11.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example12.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example13.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example14.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example15.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example16.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example17.svg',
			alt: 'onBoarding2',
		},
	]
	const images3: ImageType[] = [
		{
			key: 1,
			src: '/images/svg/examples/example21.svg',
			alt: 'onBoarding1',
		},
		{
			key: 2,
			src: '/images/svg/examples/example22.svg',
			alt: 'onBoarding2',
		},
		{
			key: 3,
			src: '/images/svg/examples/example23.svg',
			alt: 'onBoarding2',
		},
		{
			key: 4,
			src: '/images/svg/examples/example24.svg',
			alt: 'onBoarding2',
		},
		{
			key: 5,
			src: '/images/svg/examples/example25.svg',
			alt: 'onBoarding2',
		},
		{
			key: 6,
			src: '/images/svg/examples/example26.svg',
			alt: 'onBoarding2',
		},
		{
			key: 7,
			src: '/images/svg/examples/example27.svg',
			alt: 'onBoarding2',
		},
	]
	return (
		<div className="absolute bottom-0 w-full h-fit">
			<div className="flex flex-row-reverse gap-[1%] mt-[3%] overflow-hidden">
				{images1.map((image) => (
					<img
						className="w-[15%] animate-slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
				{images1.map((image) => (
					<img
						className="w-[15%] animate-slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
			</div>
			<div className="flex flex-row gap-[1%] mt-4 overflow-hidden">
				{images2.map((image) => (
					<img
						className="w-[15%] animate-reverse_slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
				{images2.map((image) => (
					<img
						className="w-[15%] animate-reverse_slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
			</div>
			<div className="flex flex-row-reverse gap-[1%] mt-4 overflow-hidden">
				{images3.map((image) => (
					<img
						className="w-[15%] animate-slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
				{images3.map((image) => (
					<img
						className="w-[15%] animate-slider"
						key={image.key}
						alt={image.alt}
						src={image.src}
					/>
				))}
			</div>
		</div>
	)
}
