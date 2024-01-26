import axios from 'axios'
import { ParamsType } from '../type'

//AIBackground
export const changeBackground = async (
	canvas_id: ParamsType,
	backgroundURL: string,
) => {
	return await axios
		.post(
			`http://localhost:8000/api/v1/canvases/${canvas_id}/backgrounds/ai/select/`,
			{ selected_url: backgroundURL },
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		.then((response) => {
			response.data.result.component.component_id, backgroundURL
		})
}
//Invite
export const createMember = async (canvas_id: ParamsType, email: string) => {
	return await axios.post(
		`http://localhost:8000/api/v1/canvases/${canvas_id}/invite/`,
		{
			user_email: email,
		},
	)
}

export const fetchMembers = async (canvas_id: ParamsType) => {
	return await axios
		.get(`http://localhost:8000/api/v1/canvases/${canvas_id}/invite/`)
		.then((response) => response.data.result.shared_members)
}