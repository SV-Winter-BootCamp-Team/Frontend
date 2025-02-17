import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createMember } from '../../../api/api'
import { ParamsType } from '../../../type'
import { getMemberListKey } from './MemberList'

export default React.memo(function Input() {
	const params = useParams<Partial<ParamsType>>()
	const [email, setEmail] = useState<string>('')

	const queryClient = useQueryClient()

	const { mutate: createMemberMutate } = useMutation({
		mutationFn: () => createMember(params.canvas_id as ParamsType, email),
		onSuccess: () => {
			alert('Invitation sent successfully!')
			setEmail('')
			queryClient.invalidateQueries({
				queryKey: getMemberListKey(params.canvas_id as string),
			})
		},
		onError: () => {
			alert('Failed to send invitation.')
		},
	})

	return (
		<div className="flex items-center justify-center mt-8 mb-8">
			<input
				type="text"
				placeholder="이메일"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-52 pl-2.5 py-1 mr-2 text-sm border-solid border-[1px] border-gray-300 rounded-sm"
			/>
			<button
				onClick={() => {
					createMemberMutate()
				}}
				className="px-2.5 py-[5px] bg-[#66cae1] rounded-[4px] text-sm text-white flex items-center"
			>
				<span>초대하기</span>
			</button>
		</div>
	)
})
