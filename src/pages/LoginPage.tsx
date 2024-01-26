import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export type UserKeyType = {
	[index: string]: string | undefined
	user_email?: string | undefined
	user_password?: string | undefined
}

export default function LoginPage() {
	const nav = useNavigate()

	const [userKey, setUserKey] = useState<UserKeyType>()

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserKey((current) => {
			let newState = { ...current }
			newState[name] = value
			return newState
		})
	}

	const onSubmit = () => {
		console.log(userKey)
		axios
			.post('http://localhost:8000/api/v1/users/login/', userKey)
			.then((response) => {
				localStorage.setItem('user_id', response.data.result.user_id)
				localStorage.setItem('user_name', response.data.result.user_name)
				alert(response.data.message)
				nav({
					pathname: `/main/${response.data.result.user_id}`,
				})
			})
			.catch((error) => {
				console.log(error.response)
				alert(error.response.data.message)
			})
		console.log('done')
	}

	useEffect(() => {
		if (typeof localStorage.getItem('user_id') === 'string') {
			window.location.replace(
				`http://localhost:5173/main/${localStorage.getItem('user_id')}`,
			)
		}
	}, [])

	return (
		<div className="flex items-center h-screen justify-left">
			<div className="absolute bg-[#66CAE1] w-screen h-screen">
				<img
					className="absolute w-full h-full"
					src="src/components/SignupPage/img/background.png"
				/>
				<div className="absolute right-[8%] w-3/5 h-full flex items-end">
					<img src="/images/svg/object.svg" />
				</div>
			</div>
			<div className="flex ml-[14%] flex-col z-10">
				<div className="bg-[#ffffff35] text-[14px] text-white py-5 px-12 flex flex-col border rounded-xl">
					<div className="flex flex-row justify-center mt-12 mb-8">
						<div className="mr-1 text-xl font-bold h-fit">Login</div>
						<div className="text-6xl h-fit font-jua">꾸며Zoom</div>
					</div>
					<input
						className="w-[300px] py-3.5 px-[17px] mt-7 border border-white border-opacity-60 rounded-full bg-transparent placeholder-opacity-50 placeholder-white"
						onChange={(e) => {
							onChange(e)
						}}
						name="user_email"
						placeholder="이메일"
					/>
					<input
						className="w-[300px] py-3.5 px-[17px] mt-7 border border-white border-opacity-60 rounded-full bg-transparent placeholder-opacity-50 placeholder-white"
						type="password"
						onChange={(e) => {
							onChange(e)
						}}
						name="user_password"
						placeholder="비밀번호"
					/>
					<button
						className="w-[300px] font-thin rounded-3xl mt-8 mb-6 py-3.5 bg-[#21AFBF] text-[#ffffff] pointer-events-auto hover:bg-[#31BFCF]"
						onClick={onSubmit}
					>
						로그인하기
					</button>
					<div className="mt-2 mb-[50px] flex flex-row justify-center text-xs">
						<div className="h-fit font-thin mr-[8px]">계정이 없으신가요? </div>
						<Link
							to="/signup"
							className="h-fit font-medium text-[#21AFBF] underline"
						>
							회원가입 하러 가기
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
