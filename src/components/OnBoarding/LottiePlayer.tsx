import { useEffect } from 'react'
import lottie, { AnimationConfigWithData } from 'lottie-web'

export default function LottiePlayer({
	animationdata,
}: AnimationConfigWithData['animationData']) {
	const container = document.querySelector('#content')!
	console.log(animationdata)
	useEffect(() => {
		{
			lottie.loadAnimation({
				container: container,
				loop: true,
				autoplay: true,
				animationData: animationdata,
			})
		}
		return () => {
			lottie
				.loadAnimation({
					container: container,
				})
				.destroy()
		}
	}, [])

	return <div id="content" className="w-fit h-full bg-white" />
}
