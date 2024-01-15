import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router'

export default function Invite() {
	const params = useParams<{ canvas_id: string }>()
	const [email, setEmail] = useState<string>('')

	const handleInvite = async () => {
		if (!email) {
			alert('Please enter an email address.')
			return
		}

		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/invite/`,
				{ user_email: email },
			)
			console.log(response.data)
			alert('Invitation sent successfully!')
		} catch (error) {
			console.error('Error sending invitation:', error)
			alert('Failed to send invitation.')
		}
	}

	return (
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
	)
}
