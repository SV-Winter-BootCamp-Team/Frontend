import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const OnBoardingPage = lazy(() => import('./pages/OnBoardingPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const MainPage = lazy(() => import('./pages/MainPage'))
const CanvasPage = lazy(() => import('./pages/CanvasPage'))

function App() {
	return (
		<Routes>
			<Route path="/" element={<OnBoardingPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/main/:user_id" element={<MainPage />} />
			<Route path="/canvas/:canvas_id" element={<CanvasPage />} />
		</Routes>
	)
}

export default App
