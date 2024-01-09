import { useState } from 'react'
import ColorPicker from './ColorPicker'
import Theme from './Theme'
import Color from './Color'

export default function AIBackground() {
	const [color, setColor] = useState<string>('#FFFFFF')
	const [theme, setTheme] = useState<string>('')

	//TODO: color, theme를 이용해서 AI 배경을 생성을 요청하는 API 호출

	return (
		<div className="flex flex-col">
			{/* 색상 영역 */}
			<div className="mt-2 ml-6">
				<p className="my-4">색상</p>
				<div className="grid grid-cols-7 gap-2 w-72">
					<ColorPicker color={color} setColor={setColor} />
					<Color color="#EC5F59" setColor={setColor} />
					<Color color="#F1A259" setColor={setColor} />
					<Color color="#FAE74F" setColor={setColor} />
					<Color color="#B7E855" setColor={setColor} />
					<Color color="#5CC55D" setColor={setColor} />
					<Color color="#A9F0DE" setColor={setColor} />
					<Color color="#4B7EF7" setColor={setColor} />
					<Color color="#3340EF" setColor={setColor} />
					<Color color="#9161F6" setColor={setColor} />
					<Color color="#EF8BE5" setColor={setColor} />
					<Color color="#FFFFFF" setColor={setColor} />
					<Color color="#BFBFBF" setColor={setColor} />
					<Color color="#000000" setColor={setColor} />
				</div>
			</div>
			{/* 테마 영역 */}
			<div className="ml-4">
				<p className="mt-8 ml-2">테마</p>
				<div className="flex flex-wrap">
					<Theme theme="힐링되는" setTheme={setTheme} />
					<Theme theme="깔끔한" setTheme={setTheme} />
					<Theme theme="귀여운" setTheme={setTheme} />
					<Theme theme="야늑한" setTheme={setTheme} />
					<Theme theme="사랑스러운" setTheme={setTheme} />
					<Theme theme="밝은" setTheme={setTheme} />
					<Theme theme="어두운" setTheme={setTheme} />
					<Theme theme="차분한" setTheme={setTheme} />
					<Theme theme="깔끔한" setTheme={setTheme} />
					<Theme theme="깔끔한" setTheme={setTheme} />
					<Theme theme="깔끔한" setTheme={setTheme} />
				</div>
			</div>
			{/* 배경 영역 */}
			<div className="mt-8 ml-6">
				<p className="mb-4">내 배경들</p>
				<div className="grid grid-cols-2 gap-4">
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
					<div className="w-[160px] bg-blue-300 h-[90px]">grid1</div>
				</div>
			</div>
		</div>
	)
}
