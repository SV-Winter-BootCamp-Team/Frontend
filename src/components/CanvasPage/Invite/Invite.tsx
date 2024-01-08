export default function Invite() {
	return (
		<div className="flex justify-center mt-8">
			<input
				type="text"
				placeholder="이메일"
				className="w-52 pl-2.5 mr-2 text-sm"
			/>
			<button className="px-2.5 py-1 bg-blue-300 rounded-sm text-sm text-white">
				초대하기
			</button>
		</div>
	)
}
