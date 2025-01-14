import { useState } from 'react'
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
import m1 from '/images/png/mm1.png'
import m2 from '/images/png/mm2.png'
import RecommendBackgroundLoading from '../RecommendBackgroundLoading'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
	const [recommendStatus, setRecommendStatus] = useState('loading')

	const [stickerInputText, setStickerInputText] = useState<string>('')
	const [style, setStyle] = useState<string>('')

	const [color, setColor] = useState<string>('')
	const [theme, setTheme] = useState<string>('')
	const [backgroundInputText, setBackgroundInputText] = useState<string>('')

	const [stickerList, setStickerList] = useState<string[]>([])
	const [backgroundList, setBackgroundList] = useState<string[]>([])
	const [Recommendbackgrounds, setRecommendbackgrounds] = useState<string[]>([])

	const fetchStickerData = async () => {
		setStickerStatus('loading')

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}canvases/${params.canvas_id}/stickers/ai/`,
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
				`${import.meta.env.VITE_BASE_URL}canvases/${params.canvas_id}/backgrounds/ai/`,
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

	// const fetchStickerData = async () => {
	// 	setStickerStatus('loading')
	// 	try {
	// 		// 실제 API 요청 대신 사용할 가짜 응답 데이터
	// 		const fakeResponse = {
	// 			data: {
	// 				result: {
	// 					s3_urls: [m1, m2, m1, m2],
	// 				},
	// 			},
	// 		}

	// 		// 가짜 지연 시간 설정 (예: 500ms)
	// 		await new Promise((resolve) => setTimeout(resolve, 5000))

	// 		setStickerStatus('completed')
	// 		setStickerList(fakeResponse.data.result.s3_urls)
	// 	} catch (error) {
	// 		console.error('Error fetching AI sticker data:', error)
	// 		throw error
	// 	}
	// }

	// const fetchBackgroundData = async () => {
	// 	setBackgroundStatus('loading')
	// 	try {
	// 		// 실제 API 요청 대신 사용할 가짜 응답 데이터
	// 		const fakeResponse = {
	// 			data: {
	// 				result: {
	// 					s3_urls: [m1, m2, m1],
	// 				},
	// 			},
	// 		}
	// 		await new Promise((resolve) => setTimeout(resolve, 5000))

	// 		setBackgroundStatus('completed')
	// 		setBackgroundList(fakeResponse.data.result.s3_urls)
	// 	} catch (error) {
	// 		console.error('Error fetching AI background data:', error)
	// 		throw error
	// 	}
	// }

	const fetchRecommendedBackgrounds = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}canvases/${params.canvas_id}/backgrounds/recommend/`,
			)
			console.log('Recommended backgrounds:', response.data)
			setRecommendbackgrounds(response.data.results)
			setRecommendStatus('completed')
		} catch (error) {
			console.error('Error fetching recommended backgrounds:', error)
		}
	}

	return (
		<div
			className={`h-full overflow-y-auto flex flex-col w-[400px] bg-white border-r-[1px] border-[#E7E8EA] ${
				!isOpen && 'hidden'
			} `}
		>
			{seletedMenu === '내 캔버스' && <MyCanvas />}
			{seletedMenu === '초대하기' && <Invite />}
			{seletedMenu === '배경 업로드' && (
				<UploadBackground setBackgroundURL={setBackgroundURL} />
			)}
			{seletedMenu === 'AI 배경' && (
				<>
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
					{backgroundStatus === 'loading' && <AIBackgroundLoading />}
				</>
			)}
			{seletedMenu === '추천 배경' && (
				<>
					{recommendStatus === 'completed' && (
						<RecommendBackground
							setBackgroundURL={setBackgroundURL}
							Recommendbackgrounds={Recommendbackgrounds}
						/>
					)}
					{recommendStatus === 'loading' && (
						<RecommendBackgroundLoading
							fetchRecommendedBackgrounds={fetchRecommendedBackgrounds}
						/>
					)}
				</>
			)}
			{seletedMenu === 'AI 스티커' && (
				<>
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
					{stickerStatus === 'loading' && (
						<AIStickerLoading inputText={stickerInputText} style={style} />
					)}
				</>
			)}
			{seletedMenu === '히스토리' && (
				<History handleAddComponent={handleAddComponent} />
			)}
		</div>
	)
}
