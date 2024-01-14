import avator from '/images/svg/avator.svg'
import download from '/images/svg/download.svg'

export default function NavBar() {
	return (
		<div className="flex items-center justify-center relative h-[50px] px-3.5 border-solid border-b-[1px] border-[#E7E8EA]">
			<p>Untitled</p>
			<button className="absolute right-36 flex px-2.5 py-1.5 mr-4 bg-purple-300 rounded-lg text-sm text-white">
				저장하기
			</button>
			<button className="absolute right-10 flex px-2.5 py-1.5 mr-4 bg-purple-300 rounded-lg">
				<img src={download} alt="download" className="w-4" />
				<p className="ml-2 text-sm text-white">다운로드</p>
			</button>
			<img src={avator} alt="profile" className="absolute right-3 w-7" />
		</div>
	)
}
