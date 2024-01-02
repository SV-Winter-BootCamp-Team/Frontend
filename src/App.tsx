import { Routes, Route } from 'react-router-dom'
import OnBoardingPage from './pages/OnBoardingPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import BackgroundPage from './pages/BackgroundPage'
import CanvasPage from './pages/CanvasPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<OnBoardingPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/main/:user_id" element={<MainPage />} />
			<Route path="/background" element={<BackgroundPage />} />
			<Route path="/canvas/:canvas_id" element={<CanvasPage />} />
		</Routes>
	)
}

export default App
