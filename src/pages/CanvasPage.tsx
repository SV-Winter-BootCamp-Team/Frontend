import NavBar from '../components/NavBar'
import Canvas from '../components/Canvas'
import ToolBar from '../components/ToolBar/ToolBar'

export default function CanvasPage() {
	return (
		<>
			<NavBar />
			<div className="flex">
				<ToolBar />
				<Canvas />
			</div>
		</>
	)
}
