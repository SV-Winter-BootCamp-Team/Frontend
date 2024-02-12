import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import avator from '/images/svg/avator.svg'
import { fetchMembers } from '../../../api/api'
import { ParamsType } from '../../../type'

type Member = {
	user_id: number
	user_name: string
	user_email: string
}
export const getMemberListKey = (canvas_id: string) => ['members', canvas_id]
export default React.memo(function MemberList() {
	const params = useParams<Partial<ParamsType>>()

	const { data: memberList, error: fetchMembersError } = useQuery({
		queryKey: getMemberListKey(params.canvas_id as string),
		queryFn: () => fetchMembers(params.canvas_id as ParamsType),
		enabled: !!params.canvas_id,
	})

	if (fetchMembersError) {
		console.error('Error fetching members:', fetchMembersError)
	}

	return (
		<div className="flex flex-col">
			{memberList?.map((member: Member, index: number) => (
				<div
					key={index}
					className="flex w-[285px] border-[1px] mb-5 py-3.5 rounded-lg bg-cyan-50 border-[#80C8DE]"
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
	)
})
