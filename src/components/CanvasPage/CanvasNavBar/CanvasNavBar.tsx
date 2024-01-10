import avator from '/images/svg/avator.svg'
import home from '/images/svg/home.svg'
import backarrow from '/images/svg/backarrow.svg'
import frontarrow from '/images/svg/frontarrow.svg'
import download from '/images/svg/download.svg'

export default function CanvasNavBar() {
	return (
		<div className="flex items-center justify-between p-2">
			<div className="flex items-center">
				<img src={home} alt="home" />
				<div className="flex justify-between w-[56px] ml-4">
					<img src={backarrow} alt="backarrow" />
					<img src={frontarrow} alt="frontarrow" />
				</div>
			</div>
			<p>Untitled</p>
			<div className="flex">
				<button className="flex p-2 mr-4 bg-purple-300 rounded-lg">
					<img src={download} alt="download" />
					<p className="ml-2 text-sm text-white">다운로드</p>
				</button>
				<img src={avator} alt="" />
			</div>
		</div>
	)
}
