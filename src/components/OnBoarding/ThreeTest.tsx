import { Canvas, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { HandleThreeType } from './OnBoardingTemplate'
import GLTFLoader from 'three-gltf-loader'

export default function ThreeTest({ color, mouseX }: HandleThreeType) {
	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		10000,
	)
	const gltf = useLoader(GLTFLoader, 'src/components/OnBoarding/Desk.gltf')

	camera.position.x += (mouseX - camera.position.x) * 0.5
	console.log(camera.position.x)
	camera.lookAt(0, 0, 0)

	return (
		<div className="w-full">
			<Canvas shadows>
				<fogExp2 />
				<PerspectiveCamera
					position={[5.5 - mouseX * 0.005, 0.02, 6]}
					fov={60}
					makeDefault
				/>
				<ambientLight intensity={1} castShadow />
				<pointLight position={[1, 2, -1]} intensity={5} castShadow />
				<mesh position={[0, -1, 0]} castShadow>
					<boxGeometry />
					<meshStandardMaterial color={color} />
				</mesh>
				<mesh
					position={[0, -1, 0]}
					rotation-x={-Math.PI / 2}
					receiveShadow={true}
				>
					<planeGeometry args={[200, 200]} />
					<meshPhongMaterial
						color={color}
						specular={'skyblue'}
						shininess={50}
					/>
				</mesh>
			</Canvas>
		</div>
	)
}
