import upload from '../../../../public/images/svg/upload.svg'
export default function Upload() {
	return (
		<div className="flex items-center justify-center mt-10">
			<button className="flex px-24 py-2.5 bg-blue-300 rounded-md">
				<img src={upload} alt="" />
				<p className="ml-3.5 text-white text-md">사진 업로드</p>
			</button>
		</div>
	)
}
