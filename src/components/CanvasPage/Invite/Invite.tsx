import React from 'react'
import MemberList from './MemberList'
import Input from './Input'

export default React.memo(function Invite() {
	return (
		<div className="flex flex-col items-center">
			<Input />
			<MemberList />
		</div>
	)
})
