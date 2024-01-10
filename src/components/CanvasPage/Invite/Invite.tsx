export default function Invite() {
	return (
		<div className="flex items-center justify-center mt-8">
			<input
				type="text"
				placeholder="이메일"
				className="w-52 pl-2.5 py-1 mr-2 text-sm border-solid border-[1px] border-gray-300 rounded-sm"
			/>
			<button className="px-2.5 py-1 bg-[#7062D5] rounded-[4px] text-sm text-white">
				초대하기
			</button>
		</div>
	)
}
