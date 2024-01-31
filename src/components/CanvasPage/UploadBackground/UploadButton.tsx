import { ChangeEvent, useRef } from 'react'
import upload from '/images/svg/upload.svg'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Background } from './UploadBackground'

type UploadButtonProps = {
	setBackgroundURL: (backgroundURL: string) => void
	setBackgrounds: (backgrounds: Background[]) => void
	backgrounds: Background[]
}

export default function UploadButton({
	setBackgroundURL,
	setBackgrounds,
	backgrounds,
}: UploadButtonProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const params = useParams<{ canvas_id: string }>()

	const convertImageToWebP = (file: Blob) => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.src = URL.createObjectURL(file)
			img.onload = () => {
				const canvas = document.createElement('canvas')
				canvas.width = img.width
				canvas.height = img.height
				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0)

				canvas.toBlob((blob) => {
					if (blob) {
						resolve(blob)
					} else {
						reject(new Error('Image conversion failed'))
					}
				}, 'image/webp')
			}
			img.onerror = reject
		})
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]

			try {
				const webPBlob: Blob = (await convertImageToWebP(file)) as Blob
				const formData = new FormData()
				formData.append('file', webPBlob, 'image.webp')
				const response = await axios.post(
					`http://localhost:8000/api/v1/canvases/${params.canvas_id}/backgrounds/upload/`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				)
				console.log(response.data)
				const background = {
					id: response.data.result.component.component_id,
					component_url: URL.createObjectURL(e.target.files[0]),
				}
				setBackgroundURL(URL.createObjectURL(e.target.files[0]))
				setBackgrounds([background, ...backgrounds])
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const errorMessage = error.response?.data.message || error.message
					console.log(errorMessage)
				} else if (error instanceof Error) {
					// 일반 오류 처리
					console.log(error.message)
				} else {
					// 알 수 없는 오류 처리
					console.log('An unexpected error occurred.')
				}
			}
		}
	}

	return (
		<button
			onClick={handleButtonClick}
			className="flex items-center justify-center h-10 mt-8 ml-8 bg-[#66cae1] rounded-lg w-[302px]"
		>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
				accept="image/*"
			/>
			<img src={upload} alt="Upload" />
			<p className="ml-3.5 text-white text-md">사진 업로드</p>
		</button>
	)
}
