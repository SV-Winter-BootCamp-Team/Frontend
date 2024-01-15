import { useState, ChangeEvent } from 'react'
import GenerateButton from '../../GenearateButton/GenerateButton'
import Theme from '../AIBackgroundGenerator/Theme'

type AIStickerGeneratorProps = {
	handleGenerateSticker: () => void
}

export default function AIStickerGenerator({
	handleGenerateSticker,
}: AIStickerGeneratorProps) {
	const [inputText, setInputText] = useState<string>('')
	const [theme, setTheme] = useState<string>('')

	// 남은 문자 수 계산
	const remainingCharacters = 300 - inputText.length

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value)
	}

	const handleResetButtonClick = () => {
		setInputText('')
		setTheme('')
	}

	return (
		<>
			<div className="flex flex-col">
				{/* 스티커 묘사 영역 */}
				<div className="mt-8 ml-8">
					<h2 className="mb-2 font-medium">스티커 묘사</h2>
					<p className="text-sm text-gray-500">
						만들고 싶은 스티커를 자세히 설명해 보세요.
					</p>
				</div>
				{/* 사용자 입력 영역 */}
				<div className="relative flex items-center justify-center mt-4">
					<div className="flex border-[1px] h-24 rounded-lg p-2.5">
						<textarea
							placeholder="입력해주세요"
							maxLength={300}
							value={inputText}
							onChange={handleInputChange}
							className="h-full text-sm rounded-lg outline-none resize-none pr-[60px] textarea-scrollbar w-[300px]"
						/>
						<div className="absolute h-fit w-fit text-xs text-gray-300 right-[55px] top-3">
							{remainingCharacters}/300
						</div>
					</div>
				</div>
				{/* 스타일 영역 */}
				<div className="mt-8 ml-6 mr-8">
					<p className="ml-2 font-medium">스타일</p>
					<div className="flex flex-wrap">
						<Theme theme="2D" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="3D" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="일러스트" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="픽셀아트" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="수채화" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="만화" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="파스텔" setTheme={setTheme} selectedTheme={theme} />
						<Theme
							theme="애니메이션"
							setTheme={setTheme}
							selectedTheme={theme}
						/>
						<Theme theme="레트로" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="로고" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="명화" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="캐리커쳐" setTheme={setTheme} selectedTheme={theme} />
					</div>
				</div>
			</div>
			{/* 버튼 영역 */}
			<div className="flex flex-col justify-end grow">
				<GenerateButton
					handleResetButtonClick={handleResetButtonClick}
					handleGenerateButtonClick={handleGenerateSticker}
				/>
			</div>
		</>
	)
}
