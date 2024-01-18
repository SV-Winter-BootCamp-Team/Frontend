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
import { Component } from '../../../pages/CanvasPage'

type MenuSectionProps = {
	isOpen: boolean
	seletedMenu: string
	setBackgroundURL: (backgroundURL: string) => void
	handleAddComponent: (componentURL: string) => void
}

export default function MenuSection({
	isOpen,
	seletedMenu,
	setBackgroundURL,
	handleAddComponent,
}: MenuSectionProps) {
	const params = useParams<{ canvas_id: string }>()
	const [stickerStatus, setStickerStatus] = useState('generator')
	const [backgroundStatus, setBackgroundStatus] = useState('generator')

	const [stickerInputText, setStickerInputText] = useState<string>('')
	const [style, setStyle] = useState<string>('')

	const [color, setColor] = useState<string>('')
	const [theme, setTheme] = useState<string>('')
	const [backgroundInputText, setBackgroundInputText] = useState<string>('')

	const [stickerList, setStickerList] = useState<string[]>([])
	const [backgroundList, setBackgroundList] = useState<string[]>([])

	const fetchStickerData = async () => {
		setStickerStatus('loading')
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/stickers/ai/`,
				{
					describe: stickerInputText,
					style: style,
				},
			)
			setStickerStatus('completed')
			setStickerList(response.data.result.s3_urls)
		} catch (error) {
			console.error('Error fetching AI sticker data:', error)
			throw error
		}
	}

	const fetchBackgroundData = async () => {
		setBackgroundStatus('loading')
		try {
			const response = await axios.post(
				`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/ai/`,
				{
					color: color,
					theme: theme,
					place: backgroundInputText,
				},
			)
			setBackgroundStatus('completed')
			setBackgroundList(response.data.result.s3_urls)
		} catch (error) {
			console.error('Error fetching AI background data:', error)
			throw error
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
							fetchBackgroundData={fetchBackgroundData}
							color={color}
							setColor={setColor}
							theme={theme}
							setTheme={setTheme}
							InputText={backgroundInputText}
							setBackgroundInputText={setBackgroundInputText}
						/>
					)}
					{backgroundStatus === 'completed' && (
						<AIBackground
							setBackgroundStatus={setBackgroundStatus}
							fetchBackgroundData={fetchBackgroundData}
							backgroundList={backgroundList}
							setBackgroundURL={setBackgroundURL}
						/>
					)}
				</Suspense>
			)}
			{seletedMenu === '추천 배경' && (
				<RecommendBackground setBackgroundURL={setBackgroundURL} />
			)}
			{seletedMenu === 'AI 스티커' && (
				<Suspense fallback={<AIStickerLoading />}>
					{stickerStatus === 'generator' && (
						<AIStickerGenerator
							fetchStickerData={fetchStickerData}
							inputText={stickerInputText}
							setInputText={setStickerInputText}
							style={style}
							setStyle={setStyle}
						/>
					)}
					{stickerStatus === 'completed' && (
						<AISticker
							handleAddComponent={handleAddComponent}
							setStickerStatus={setStickerStatus}
							fetchStickerData={fetchStickerData}
							stickerList={stickerList}
							inputText={stickerInputText}
							style={style}
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
