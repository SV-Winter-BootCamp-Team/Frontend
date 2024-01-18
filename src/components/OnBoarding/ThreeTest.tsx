import { Canvas } from '@react-three/fiber'

export default function ThreeTest({ color }: { color: string }) {
	return (
		<div>
			<Canvas>
				<ambientLight intensity={5} />
				<mesh>
					<boxGeometry />
					<meshStandardMaterial color={color} />
				</mesh>
			</Canvas>
		</div>
	)
}
