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
import axios from 'axios'
import { useParams } from 'react-router'

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
	const params = useParams<{ canvas_id: string }>()
	const [stickerStatus, setStickerStatus] = useState('generator')
	const [backgroundStatus, setBackgroundStatus] = useState('generator')

	const [inputText, setInputText] = useState<string>('')
	const [theme, setTheme] = useState<string>('')

	const [stickerList, setStickerList] = useState<string[]>([])

	const fetchStickerData = async () => {
		setStickerStatus('loading')
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/stickers/ai/`,
				{
					describe: inputText,
					style: theme,
				},
			)
			console.log(response.data)
			setStickerStatus('completed')
			setStickerList(response.data.result.s3_urls)
		} catch (error) {
			console.error('Error fetching AI sticker data:', error)
			throw error
		}
	}

	const fetchBackgroundData = () => {}

	const handleGenerateBackground = async () => {
		setBackgroundStatus('loading')
		try {
			const data = await fetchBackgroundData()
			setBackgroundStatus('completed')
		} catch (error) {
			console.error('Error fetching background data: ', error)
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
						<AIStickerGenerator
							fetchStickerData={fetchStickerData}
							inputText={inputText}
							setInputText={setInputText}
							theme={theme}
							setTheme={setTheme}
						/>
					)}
					{stickerStatus === 'completed' && (
						<AISticker
							handleAddComponent={handleAddComponent}
							setStickerStatus={setStickerStatus}
							fetchStickerData={fetchStickerData}
							stickerList={stickerList}
							inputText={inputText}
							style={theme}
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
