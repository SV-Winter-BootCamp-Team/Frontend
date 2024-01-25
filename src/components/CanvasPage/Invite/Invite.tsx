import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'

import avator from '/images/svg/avator.svg'
import { fetchMembers } from '../../../api/api'

export type Member = {
	user_id: number
	user_email: string
	user_name: string
}

export type ParamsType = {
	canvas_id?: string
}

export default function Invite() {
	const params = useParams<Partial<ParamsType>>()
	const [email, setEmail] = useState<string>('')

	const { data: memberList, error } = useQuery({
		queryKey: ['members', params.canvas_id],
		queryFn: () => fetchMembers(params.canvas_id as ParamsType),
	})

	if (error) {
		console.error('Error fetching members:', error)
	}

	const handleInvite = async () => {
		if (!email) {
			alert('Please enter an email address.')
			return
		}
		try {
			await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/invite/`,
				{ user_email: email },
			)
			alert('Invitation sent successfully!')
		} catch (error) {
			console.error('Error sending invitation:', error)
			alert('Failed to send invitation.')
		}
	}

	return (
		<div className="flex flex-col items-center">
			<div className="flex items-center justify-center mt-8">
				<input
					type="text"
					placeholder="이메일"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-52 pl-2.5 py-1 mr-2 text-sm border-solid border-[1px] border-gray-300 rounded-sm"
				/>
				<button
					onClick={handleInvite}
					className="px-2.5 py-1 bg-[#66cae1] rounded-[4px] text-sm text-white"
				>
					초대하기
				</button>
			</div>
			<div className="flex flex-col">
				{memberList?.map((member: Member, index: number) => (
					<div
						key={index}
						className="flex w-[285px] border-[1px] my-4 py-3.5 rounded-lg bg-cyan-50 border-[#80C8DE]"
					>
						<img src={avator} alt="profile" className="mx-4 w-7" />
						<div key={member.user_id} className="flex flex-col">
							<p className="text-[14px]">{member.user_name}</p>
							<p className="text-[11.5px] font-light text-gray-400">
								{member.user_email}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
