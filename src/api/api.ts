import axios from 'axios'
import { ParamsType } from '../components/CanvasPage/Invite/Invite'

export const handleInvite = async (canvas_id: string, email: string) => {
	if (!email) {
		alert('Please enter an email address.')
		return
	}
	try {
		await axios.post(
			`http://localhost:8000/api/v1/canvases/${canvas_id}/invite/`,
			{ user_email: email },
		)
		alert('Invitation sent successfully!')
	} catch (error) {
		console.error('Error sending invitation:', error)
		alert('Failed to send invitation.')
	}
}

export const fetchMembers = async (canvas_id: ParamsType) => {
	return await axios
		.get(`http://localhost:8000/api/v1/canvases/${canvas_id}/invite/`)
		.then((response) => response.data.result.shared_members)
}
