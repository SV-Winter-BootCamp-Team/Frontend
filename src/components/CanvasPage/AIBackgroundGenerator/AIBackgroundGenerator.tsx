import { useState } from 'react'
import ColorPicker from './ColorPicker'
import Theme from './Theme'
import Color from './Color'
import palette from '/images/svg/palette.svg'
import brush from '/images/svg/brush.svg'
import Button from './Button'

export default function AIBackgroundGenerator() {
	const [color, setColor] = useState<string>('#FFFFFF')
	const [theme, setTheme] = useState<string>('')

	const handleClickButton = () => {
		
	}

	//TODO: color, theme를 이용해서 AI 배경을 생성을 요청하는 API 호출

	return (
		<div className="flex flex-col grow">
			{/* 색상 영역 */}
			<div className="mt-2 ml-6">
				<div className="flex">
					<img src={palette} alt="palette" className="w-5" />
					<p className="my-4 ml-1">색상</p>
				</div>
				<div className="grid grid-cols-7 gap-3 w-72">
					<ColorPicker color={color} setColor={setColor} />
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
					<Color color="#FFFFFF" setColor={setColor} selectedColor={color} />
					<Color color="#BFBFBF" setColor={setColor} selectedColor={color} />
					<Color color="#000000" setColor={setColor} selectedColor={color} />
				</div>
			</div>
			{/* 테마 영역 */}
			<div className="mt-8 ml-4">
				<div className="flex items-center ml-2">
					<img src={brush} alt="theme" className="w-5" />
					<p className="ml-1">테마</p>
				</div>
				<div className="flex flex-wrap">
					<Theme theme="힐링되는" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="귀여운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="아늑한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="사랑스러운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="밝은" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="어두운" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="차분한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
					<Theme theme="깔끔한" setTheme={setTheme} selectedTheme={theme} />
				</div>
			</div>
			{/* 버튼 영역 */}
			<div className="flex flex-col justify-end grow">
				<Button handleClickButton={handleClickButton} />
			</div>
		</div>
	)
}
