import MyCanvas from '../MyCanvas'
import Invite from '../Invite'
import AISticker from '../AISticker'
import AIBackground from '../AIBackground'
import Upload from '../Upload'

type MenuSectionProps = {
	isOpen: boolean
	menu: string
}

export default function MenuSection({ isOpen, menu }: MenuSectionProps) {
	return (
		<div className={`flex-grow w-60 bg-red-300 ${!isOpen && 'hidden'}`}>
			{menu === '내 캔버스' && <MyCanvas />}
			{menu === '초대하기' && <Invite />}
			{menu === '배경 업로드' && <Upload />}
			{menu === 'AI 배경' && <AIBackground />}
			{menu === 'AI 스티커' && <AISticker />}
		</div>
	)
}
