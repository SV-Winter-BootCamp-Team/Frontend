import { useNavigate } from 'react-router-dom'

export default function NavBar() {
	const nav = useNavigate()
	return (
		<div className="flex items-center h-12 pl-4 bg-[#66CAE1]">
			<h1 className="text-white font-jua text-3xl">꾸며Zoom</h1>
			<button
				className="font-jua text-xl text-[#66CAE1] bg-white rounded-lg py-1 px-2 ml-auto mr-4 border hover:border-[#31BFCF]"
				onClick={() => {
					localStorage.clear()
					nav({
						pathname: '/',
					})
				}}
			>
				로그아웃
			</button>
		</div>
	)
}
