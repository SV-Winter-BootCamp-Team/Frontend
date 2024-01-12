import { useState } from 'react'
import MyCanvas from '../MyCanvas'
import Invite from '../Invite'
import AISticker from '../AISticker'
import AIBackgroundGenerator from '../AIBackgroundGenerator'
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
	const [isLoadingAI, setIsLoadingAI] = useState(false)

	// 클릭 이벤트 핸들러를 추가하여 AI 배경을 클릭했을 때 로딩 상태를 설정하도록 합니다.
	const handleAIClick = () => {
		setIsLoadingAI(true)

		// 실제로 AI 작업을 수행하거나 데이터를 불러오는 코드를 추가하세요.

		// 예시: setTimeout을 사용하여 3초 후 로딩 상태를 false로 변경합니다.
		setTimeout(() => {
			setIsLoadingAI(false)
		}, 3000) // 3초
	}

	return (
		<div
			style={{ height: 'calc(100vh - 50px)' }}
			className={`overflow-y-auto flex flex-col w-[380px] bg-white ${
				!isOpen && 'hidden'
			} `}
		>
			{menu === '내 캔버스' && <MyCanvas />}
			{menu === '초대하기' && <Invite />}
			{menu === '배경 업로드' && <UploadBackground setImageURL={setImageURL} />}
			{menu === 'AI 배경' &&
				// isLoadingAI 상태에 따라 AI 배경 또는 AI Loading을 렌더링합니다.
				(isLoadingAI ? <div>Loading AI...</div> : <AIBackgroundGenerator />)}
			{menu === '추천 배경' && <RecommendBackground />}
			{menu === 'AI 스티커' && <AISticker />}
			{menu === '히스토리' && <History />}
			{menu === '텍스트' && <Text />}
		</div>
	)
}
