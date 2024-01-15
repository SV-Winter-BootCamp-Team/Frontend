import React, { useState } from 'react'
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
			.post('http://localhost:8000/api/v1/users/register/', userKey)
			.then((response) => {
				console.log(response)
				nav({
					pathname: '/login',
				})
			})
			.catch((error) => {
				setSignUpSuccess(true)
			})
	}

	return (
		<div className="h-[100vh] flex flex-col">
			<div className="flex flex-row justify-center basis-2/12 sm:pt-16">
				<div className="h-fit text-5xl font-bold mr-[8px]">Join</div>
				<div className="h-fit text-5xl font-bold text-[#603DED]">꾸며Zoom</div>
			</div>
			<div className="basis-10/12">
				<div className="w-fit h-fit text-[30px] my-4 mx-auto py-12 px-16 flex flex-col shadow-lg shadow-gray-400 rounded">
					<div>
						<h1 className="mb-[20px]">이름</h1>
						<input
							className="w-[450px] border-[1px] border-[#000000] rounded"
							onChange={onChange}
							name="user_name"
						/>
					</div>
					<div>
						<h1 className="mt-[20px] mb-[20px]">이메일</h1>
						<input
							className={`w-[450px] ${
								!signUpSuccess
									? 'border-[1px] border-[#000000]'
									: 'border-[2px] border-[#eb683f]'
							} rounded`}
							onChange={onChange}
							name="user_email"
						/>
						<div
							className={`text-[15px] text-[#eb683f] ${
								!signUpSuccess && 'hidden'
							}`}
						>
							이메일을 정확히 입력해주세요
						</div>
					</div>
					<div>
						<h1 className="mt-[20px] mb-[20px]">비밀번호</h1>
						<input
							className="w-[450px] border-[1px] border-[#000000] rounded"
							type="password"
							onChange={onChange}
							name="user_password"
						/>
					</div>
					<button
						className="bg-[#603DED] w-[450px] rounded mt-12 mb-6 py-[10px] text-[#ffffff]"
						onClick={onSubmit}
					>
						가입하기
					</button>
				</div>
			</div>
			<div className="basis-2/12 flex flex-row justify-center text-[25px]">
				<div className="h-fit mr-[8px]">이미 회원이신가요? </div>
				<Link to="/login" className="h-fit font-bold text-[#603DED] underline">
					로그인 하러 가기
				</Link>
			</div>
		</div>
	)
}
