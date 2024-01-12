import avator from '/images/svg/avator.svg'
import home from '/images/svg/home.svg'
import backarrow from '/images/svg/backarrow.svg'
import frontarrow from '/images/svg/frontarrow.svg'
import download from '/images/svg/download.svg'

export default function NavBar() {
	return (
		<div className="flex items-center justify-between h-[50px] px-3.5 border-solid border-b-[1px] border-[#E7E8EA]">
			<div className="flex items-center">
				<img src={home} alt="home" className="w-8" />
				<div className="flex justify-between items-center w-[56px] ml-4">
					<img src={backarrow} alt="backarrow" className="w-5" />
					<img src={frontarrow} alt="frontarrow" className="w-5" />
				</div>
			</div>
			<p>Untitled</p>
			<div className="flex">
				<button className="flex px-2.5 py-1.5 mr-4 bg-purple-300 rounded-lg">
					<img src={download} alt="download" className="w-4" />
					<p className="ml-2 text-sm text-white">다운로드</p>
				</button>
				<img src={avator} alt="profile" className="w-7" />
			</div>
		</div>
	)
}
