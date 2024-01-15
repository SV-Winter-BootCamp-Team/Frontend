import { Suspense, useState } from 'react'
import MyCanvas from '../MyCanvas'
import Invite from '../Invite'
import AISticker from '../AISticker'
import AIBackgroundGenerator from '../AIBackgroundGenerator'
import RecommendBackground from '../RecommendBackground'
import UploadBackground from '../UploadBackground'
import History from '../History'
import AIStickerLoading from '../AIStickerLoading'
import AIStickerGenerator from '../AIStickerGenerator'
import AIBackground from '../AIBackground'
import AIBackgroundLoading from '../AIBackgroundLoading'

type MenuSectionProps = {
	isOpen: boolean
	seletedMenu: string
	setBackgroundURL: (backgroundURL: string) => void
	handleAddComponent: (componentURL: string) => void
	handleApplyBackground: (backgroundURL: string) => void
}

export default function MenuSection({
	isOpen,
	seletedMenu,
	setBackgroundURL,
	handleAddComponent,
	handleApplyBackground,
}: MenuSectionProps) {
	const [stickerStatus, setStickerStatus] = useState('generator')
	const [backgroundStatus, setBackgroundStatus] = useState('generator')
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

	const fetchBackgroundData = () => {
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

	const handleGenerateBackground = async () => {
		setBackgroundStatus('loading')
		try {
			const data = await fetchBackgroundData()
			// 데이터 처리 (예: 배경 설정)
			setBackgroundStatus('completed')
		} catch (error) {
			console.error('Error fetching background data: ', error)
			// 에러 처리
		}
	}

	return (
		<div
			className={`h-full overflow-y-auto flex flex-col w-[380px] bg-white border-r-[1px] border-[#E7E8EA] ${
				!isOpen && 'hidden'
			} `}
		>
			{seletedMenu === '내 캔버스' && <MyCanvas />}
			{seletedMenu === '초대하기' && <Invite />}
			{seletedMenu === '배경 업로드' && (
				<UploadBackground setBackgroundURL={setBackgroundURL} />
			)}
			{seletedMenu === 'AI 배경' && (
				<Suspense fallback={<AIBackgroundLoading />}>
					{backgroundStatus === 'generator' && (
						<AIBackgroundGenerator
							handleGenerateBackground={handleGenerateBackground}
						/>
					)}
					{backgroundStatus === 'completed' && (
						<AIBackground
							handleApplyBackground={handleApplyBackground}
							setBackgroundStatus={setBackgroundStatus}
							handleGenerateBackground={handleGenerateBackground}
						/>
					)}
				</Suspense>
			)}
			{seletedMenu === '추천 배경' && <RecommendBackground />}
			{seletedMenu === 'AI 스티커' && (
				<Suspense fallback={<AIStickerLoading />}>
					{stickerStatus === 'generator' && (
						<AIStickerGenerator handleGenerateSticker={handleGenerateSticker} />
					)}
					{stickerStatus === 'completed' && (
						<AISticker
							handleAddComponent={handleAddComponent}
							setStickerStatus={setStickerStatus}
							handleGenerateSticker={handleGenerateSticker}
						/>
					)}
				</Suspense>
			)}
			{seletedMenu === '히스토리' && (
				<History handleAddComponent={handleAddComponent} />
			)}
		</div>
	)
}
