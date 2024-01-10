import { ChangeEvent, useRef } from 'react'
import upload from '/images/svg/upload.svg'
import { UploadProps } from './Upload'

export default function UploadButton({ setImageURL }: UploadProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImageURL(URL.createObjectURL(e.target.files[0]))
		}
	}

	return (
		<button
			onClick={handleButtonClick}
			className="flex items-center justify-center h-10 mt-8 bg-blue-400 rounded-lg w-[340px]"
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
