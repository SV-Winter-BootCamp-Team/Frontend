import { Suspense, useState } from 'react'
import MyCanvas from '../MyCanvas'
import Invite from '../Invite'
import AISticker from '../AISticker'
import AIBackgroundGenerator from '../AIBackgroundGenerator'
import RecommendBackground from '../RecommendBackground'
import UploadBackground from '../UploadBackground'
import History from '../History'
import Text from '../Text'
import AIStickerLoading from '../AIStickerLoading'
import AIStickerGenerator from '../AIStickerGenerator'

type MenuSectionProps = {
	isOpen: boolean
	menu: string
	setBackgroundURL: (backgroundURL: string) => void
	handleAddComponent: (componentURL: string) => void
}

export default function MenuSection({
	isOpen,
	menu,
	setBackgroundURL,
	handleAddComponent,
}: MenuSectionProps) {
	const [stickerStatus, setStickerStatus] = useState('generator')
	// Mock 데이터를 정의합니다 (예시)
	const mockStickerData = {
		sticker: 'Generated AI Sticker',
	}

	// Mock 데이터를 반환하는 비동기 함수
	const fetchStickerData = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockStickerData)
			}, 1000) // 3초 후에 mock 데이터 반환
		})
	}

	const handleGenerateSticker = async () => {
		setStickerStatus('loading')
		try {
			const data = await fetchStickerData()
			// 데이터 처리 (예: 스티커 설정)
			setStickerStatus('completed')
		} catch (error) {
			console.error('Error fetching sticker data: ', error)
			// 에러 처리
		}
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
			{menu === '배경 업로드' && (
				<UploadBackground setBackgroundURL={setBackgroundURL} />
			)}
			{menu === 'AI 배경' && <AIBackgroundGenerator />}
			{menu === '추천 배경' && <RecommendBackground />}
			{menu === 'AI 스티커' && (
				<Suspense fallback={<AIStickerLoading />}>
					{stickerStatus === 'generator' && (
						<AIStickerGenerator
							handleGenerateButtonClick={handleGenerateSticker}
						/>
					)}
					{stickerStatus === 'completed' && (
						<AISticker handleAddComponent={handleAddComponent} />
					)}
				</Suspense>
			)}
			{menu === '히스토리' && <History />}
			{menu === '텍스트' && <Text />}
		</div>
	)
}
