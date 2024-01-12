import { useState, ChangeEvent } from 'react'
import Button, { ButtonProps } from '../AIBackgroundGenerator/Button'
import Theme from '../AIBackgroundGenerator/Theme'
import brush from '/images/svg/brush.svg'

export default function AIStickerGenerator({
	handleGenerateButtonClick,
}: ButtonProps) {
	// 사용자 입력을 추적하는 상태
	const [inputText, setInputText] = useState<string>('')
	const [theme, setTheme] = useState<string>('')

	// 사용자가 입력할 때마다 호출되는 이벤트 핸들러
	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value)
	}

	// 남은 문자 수 계산
	const remainingCharacters = 300 - inputText.length

	return (
		<>
			<div className="flex flex-col">
				{/* 스티커 묘사 영역 */}
				<div className="mt-8 ml-8">
					<h2 className="mb-2 font-semibold">스티커 묘사</h2>
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
				{/* 테마 영역 */}
				<div className="mt-8 ml-6 mr-8">
					<p className="ml-2 font-semibold">테마</p>
					<div className="flex flex-wrap">
						<Theme theme="힐링되는" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="귀여운" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="아늑한" setTheme={setTheme} selectedTheme={theme} />
						<Theme
							theme="사랑스러운"
							setTheme={setTheme}
							selectedTheme={theme}
						/>
						<Theme theme="밝은" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="어두운" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="차분한" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
						<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
					</div>
				</div>
			</div>
			{/* 버튼 영역 */}
			<div className="flex flex-col justify-end grow">
				<Button handleGenerateButtonClick={handleGenerateButtonClick} />
			</div>
		</>
	)
}
