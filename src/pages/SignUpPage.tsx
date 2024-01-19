import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export type UserKeyType = {
	[index: string]: string | undefined
	user_name?: string | undefined
	user_email?: string | undefined
	user_password?: string | undefined
}

export default function SignUpPage() {
	const nav = useNavigate()

	const [userKey, setUserKey] = useState<UserKeyType>()
	const [signUpSuccess, setSignUpSuccess] = useState(false)
	const [nameCheck, setNameCheck] = useState(false)
	const [emailCheck, setEmailCheck] = useState(false)
	const [passwordCheck, setPasswordCheck] = useState(false)
	const [signUpReady, setSignUpReady] = useState(false)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserKey((current) => {
			let newState = { ...current }
			newState[name] = value
			return newState
		})
		if (nameCheck && emailCheck && passwordCheck) {
			setSignUpReady(true)
		}
	}

	const onSubmit = () => {
		console.log(userKey)

		axios
			.post('http://localhost:8000/api/v1/users/register/', userKey)
			.then((response) => {
				console.log(response)
				nav({
					pathname: '/login',
				})
			})
			.catch(() => {
				setSignUpSuccess(true)
			})
	}

	useEffect(() => {
		if (typeof localStorage.getItem('user_id') === 'string') {
			window.location.replace(
				`http://localhost:5173/main/${localStorage.getItem('user_id')}`,
			)
		}
	}, [])

	return (
		<div className="h-screen flex justify-left items-center">
			<div className="absolute bg-[#66CAE1] w-screen h-screen">
				<img
					className="absolute w-full h-full"
					src="src/components/SignupPage/img/background.png"
				/>
				<div className="absolute right-[8%] w-3/5 h-full flex items-end">
					<img src="src/components/SignupPage/img/object.png" />
				</div>
			</div>
			<div className="flex ml-[14%] flex-col z-10">
				<div className="bg-[#ffffff35] text-[14px] text-white py-5 px-12 flex flex-col border rounded-xl">
					<div className="mt-12 mb-8 flex flex-row justify-center">
						<div className="h-fit text-xl font-bold mr-1">Join</div>
						<div className="h-fit text-6xl font-jua">꾸며Zoom</div>
					</div>
					<input
						className="w-[300px] py-3.5 px-[17px] mt-7 border border-white border-opacity-60 rounded-full bg-transparent placeholder-opacity-50 placeholder-white"
						onChange={(e) => {
							onChange(e)
							setNameCheck(true)
						}}
						name="user_name"
						placeholder="이름"
					/>
					<input
						className={`w-[300px] py-3.5 px-[17px] mt-7 ${
							signUpSuccess
								? 'border border-[#2C67ED]'
								: 'border border-opacity-60 border-white'
						} rounded-3xl bg-transparent placeholder-opacity-50 placeholder-white`}
						onChange={(e) => {
							onChange(e)
							setEmailCheck(true)
						}}
						name="user_email"
						placeholder="이메일"
					/>
					<div
						className={`ml-3 text-[11px] text-[#2C67ED] ${
							!signUpSuccess && 'hidden'
						}`}
					>
						이메일을 정확히 입력해주세요
					</div>
					<input
						className="w-[300px] py-3.5 px-[17px] mt-7 border border-opacity-60 border-white rounded-3xl bg-transparent placeholder-opacity-50 placeholder-white"
						type="password"
						onChange={(e) => {
							onChange(e)
							setPasswordCheck(true)
						}}
						name="user_password"
						placeholder="비밀번호"
					/>
					<button
						className={`w-[300px] font-thin rounded-3xl mt-8 mb-6 py-3.5 ${
							signUpReady
								? 'bg-[#21AFBF] text-[#ffffff] pointer-events-auto hover:bg-[#31BFCF]'
								: 'bg-[#54ACBC70] text-[#ffffff] pointer-events-none'
						}`}
						onClick={onSubmit}
					>
						가입하기
					</button>
					<div className="mt-2 mb-[50px] flex flex-row justify-center text-xs">
						<div className="h-fit font-thin mr-[8px]">이미 회원이신가요? </div>
						<Link
							to="/login"
							className="h-fit font-medium text-[#21AFBF] underline"
						>
							로그인 하러 가기
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
