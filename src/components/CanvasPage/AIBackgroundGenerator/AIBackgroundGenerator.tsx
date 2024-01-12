import { ChangeEvent, useState } from 'react'
import Theme from './Theme'
import Color from './Color'
import Button from './Button'

export default function AIBackgroundGenerator() {
	const [color, setColor] = useState<string>('#FFFFFF')
	const [style, setStyle] = useState<string>('')

	const [inputText, setInputText] = useState<string>('')

	// 사용자가 입력할 때마다 호출되는 이벤트 핸들러
	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const input = event.target.value
		if (input.length <= 20) {
			setInputText(input)
		}
	}

	console.log(inputText)

	// 남은 문자 수 계산
	const remainingCharacters = 20 - inputText.length

	const handleGenerateButtonClick = () => {}

	//TODO: color, theme를 이용해서 AI 배경을 생성을 요청하는 API 호출

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
					<Color color="#976D5" setColor={setColor} selectedColor={color} />
					<Color color="#BFBFBF" setColor={setColor} selectedColor={color} />
					<Color color="#000000" setColor={setColor} selectedColor={color} />
				</div>
			</div>
			{/* 테마 영역 */}
			<div className="mt-8 ml-6 mr-8">
				<p className="ml-2 font-medium">테마</p>
				<div className="flex flex-wrap">
					<Theme theme="힐링되는" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="깔끔한" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="귀여운" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="아늑한" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="사랑스러운" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="밝은" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="어두운" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="차분한" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="깔끔한" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="깔끔한" setTheme={setStyle} selectedTheme={style} />
					<Theme theme="깔끔한" setTheme={setStyle} selectedTheme={style} />
				</div>
			</div>
			{/* 배경 묘사 영역 */}
			<div className="mt-8 ml-8">
				<h2 className="mb-2 font-medium">배경 묘사</h2>
				<p className="text-sm text-gray-500">
					만들고 싶은 배경을 간단히 설명해 보세요.
				</p>
			</div>
			{/* 사용자 입력 영역 */}
			<div className="relative flex items-center justify-center mt-4">
				<div className="flex border-[1px] h-24 rounded-lg p-2.5">
					<textarea
						placeholder="입력해주세요"
						maxLength={20}
						value={inputText}
						onChange={handleInputChange}
						className="h-full text-sm rounded-lg outline-none resize-none pr-[60px] textarea-scrollbar w-[300px]"
					/>
					<div className="absolute h-fit w-fit text-xs text-gray-300 right-[55px] top-3">
						{remainingCharacters}/20
					</div>
				</div>
			</div>
			{/* 버튼 영역 */}
			<div className="flex flex-col justify-end grow">
				<Button handleGenerateButtonClick={handleGenerateButtonClick} />
			</div>
		</div>
	)
}
