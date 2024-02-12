import React, { ChangeEvent } from 'react'

type InputProps = {
	InputText: string
	handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	remainingCharacters: number
}

export default React.memo(function Input({
	InputText,
	handleInputChange,
	remainingCharacters,
}: InputProps) {
	return (
		<>
			<div className="mt-8 ml-8">
				<h2 className="mb-2 font-medium">배경 묘사</h2>
				<p className="text-sm text-gray-500">
					만들고 싶은 배경을 간단히 설명해 보세요.
				</p>
			</div>
			<div className="relative flex items-center mt-4 ml-8">
				<div className="flex border-[1px] h-24 rounded-lg p-2.5">
					<textarea
						placeholder="입력해주세요"
						maxLength={20}
						value={InputText}
						onChange={handleInputChange}
						className="h-full text-sm rounded-lg outline-none resize-none pr-[60px] textarea-scrollbar w-[300px]"
					/>
					<div className="absolute h-fit w-fit text-xs text-gray-300 right-[55px] top-3">
						{remainingCharacters}/20
					</div>
				</div>
			</div>
		</>
	)
})
