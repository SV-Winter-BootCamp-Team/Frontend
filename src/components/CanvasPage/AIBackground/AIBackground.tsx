import ColorPicker from './ColorPicker'

export default function AIBackground() {
	return (
		<div>
			<p className="flex items-center mt-4 ml-5">색상</p>
			<ColorPicker />
			<p className="flex items-center mt-4 ml-5">테마</p>

			<div className="flex flex-wrap">
				<div className="flex items-center justify-center mt-4 ml-4 rounded-3xl bg-slate-100">
					<p className="px-3 py-1.5 text-sm">힐링되는</p>
				</div>
				<div className="flex items-center justify-center mt-4 ml-4 rounded-3xl bg-slate-100">
					<p className="px-3 py-1.5 text-sm">힙한</p>
				</div>
				<div className="flex items-center justify-center mt-4 ml-4 rounded-3xl bg-slate-100">
					<p className="px-3 py-1.5 text-sm">귀여운</p>
				</div>
				<div className="flex items-center justify-center mt-4 ml-4 rounded-3xl bg-slate-100">
					<p className="px-3 py-1.5 text-sm">야늑한</p>
				</div>
				<div className="flex items-center justify-center mt-4 ml-4 rounded-3xl bg-slate-100">
					<p className="px-3 py-1.5 text-sm">사랑스러운</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 mx-4 my-4 mt-6">
				<div className="bg-blue-300 h-28">grid1</div>
				<div className="bg-blue-300 h-28">grid2</div>
				<div className="bg-blue-300 h-28">grid3</div>
				<div className="bg-blue-300 h-28">grid4</div>
			</div>
		</div>
	)
}
