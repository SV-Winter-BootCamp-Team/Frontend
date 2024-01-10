import MyCanvas from '../MyCanvas'
import Invite from '../Invite'
import AISticker from '../AISticker'
import AIBackground from '../AIBackgroundGenerator'
import RecommendBackground from '../RecommendBackground'
import UploadBackground from '../UploadBackground'
import History from '../History'
import Text from '../Text'

type MenuSectionProps = {
	isOpen: boolean
	menu: string
	setImageURL: (imageURL: string) => void
}

export default function MenuSection({
	isOpen,
	menu,
	setImageURL,
}: MenuSectionProps) {
	return (
		<div
			style={{ height: 'calc(100vh - 50px)' }}
			className={` overflow-y-auto flex flex-col w-[380px] bg-white ${
				!isOpen && 'hidden'
			} `}
		>
			{menu === '내 캔버스' && <MyCanvas />}
			{menu === '초대하기' && <Invite />}
			{menu === '배경 업로드' && <UploadBackground setImageURL={setImageURL} />}
			{menu === 'AI 배경' && <AIBackground />}
			{menu === '추천 배경' && <RecommendBackground />}
			{menu === 'AI 스티커' && <AISticker />}
			{menu === '히스토리' && <History />}
			{menu === '텍스트' && <Text />}
		</div>
	)
}
