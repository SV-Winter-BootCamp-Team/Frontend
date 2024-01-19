export default function NavBar() {
	return (
		<div className="flex items-center h-12 pl-4 bg-purple-200">
			<h1 className="text-gray-600">꾸며Zoom</h1>
			<button
				className="font-jua text-xl text-[#66CAE1] bg-white rounded-lg py-1 px-2 ml-auto mr-4 border hover:border-[#31BFCF]"
				onClick={() => {
					window.location.replace(`http://localhost:5173`)
					localStorage.clear()
				}}
			>
				로그아웃
			</button>
		</div>
	)
}
