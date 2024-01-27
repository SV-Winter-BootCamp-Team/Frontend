import React, { ChangeEvent } from 'react'
import Theme from './Theme'
import Color from './Color'
import GenerateButton from '../../GenearateButton/'
import Input from './Input'

type AIBackgroundGeneratorProps = {
	fetchBackgroundData: () => void
	color: string
	setColor: (color: string) => void
	theme: string
	setTheme: (theme: string) => void
	InputText: string
	setBackgroundInputText: (inputText: string) => void
}

export default React.memo(function AIBackgroundGenerator({
	fetchBackgroundData,
	color,
	setColor,
	theme,
	setTheme,
	InputText,
	setBackgroundInputText,
}: AIBackgroundGeneratorProps) {
	// 사용자가 입력할 때마다 호출되는 이벤트 핸들러
	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const input = event.target.value
		if (input.length <= 20) {
			setBackgroundInputText(input)
		}
	}

	const handleResetButtonClick = () => {
		setColor('')
		setBackgroundInputText('')
		setTheme('')
	}

	// 남은 문자 수 계산
	const remainingCharacters = 20 - InputText.length

	return (
		<div className="flex flex-col grow">
			{/* 색상 영역 */}
			<div className="mt-2 ml-8">
				<p className="my-4 font-medium">색상</p>
				<div className="grid grid-cols-7 gap-x-3 gap-y-2 w-72">
					<Color color="#FFFFFF" setColor={setColor} selectedColor={color} />
					<Color color="#EC5F59" setColor={setColor} selectedColor={color} />
					<Color color="#F1A259" setColor={setColor} selectedColor={color} />
					<Color color="#FAE74F" setColor={setColor} selectedColor={color} />
					<Color color="#B7E855" setColor={setColor} selectedColor={color} />
					<Color color="#5CC55D" setColor={setColor} selectedColor={color} />
					<Color color="#A9F0DE" setColor={setColor} selectedColor={color} />
					<Color color="#4B7EF7" setColor={setColor} selectedColor={color} />
					<Color color="#3340EF" setColor={setColor} selectedColor={color} />
					<Color color="#9161F6" setColor={setColor} selectedColor={color} />
					<Color color="#EF8BE5" setColor={setColor} selectedColor={color} />
					<Color color="#a16207" setColor={setColor} selectedColor={color} />
					<Color color="#BFBFBF" setColor={setColor} selectedColor={color} />
					<Color color="#000000" setColor={setColor} selectedColor={color} />
				</div>
			</div>
			{/* 테마 영역 */}
			<div className="mt-8 ml-6 mr-8">
				<p className="ml-2 font-medium">테마</p>
				<div className="flex flex-wrap">
					<Theme theme="힐링되는" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="귀여운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="아늑한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="사랑스러운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="밝은" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="어두운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="차분한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="싱그러운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="따뜻한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="차가운" setTheme={setTheme} selectedTheme={theme} />
				</div>
			</div>
			{/* 배경 묘사 영역 */}
			<Input
				InputText={InputText}
				handleInputChange={handleInputChange}
				remainingCharacters={remainingCharacters}
			/>
			{/* 버튼 영역 */}
			<GenerateButton
				handleResetButtonClick={handleResetButtonClick}
				handleGenerateButtonClick={fetchBackgroundData}
			/>
		</div>
	)
})
