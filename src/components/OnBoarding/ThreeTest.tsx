import { Canvas, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { HandleThreeType } from './OnBoardingTemplate'
import GLTFLoader from 'three-gltf-loader'

export default function ThreeTest({ color, mouseX, x }: HandleThreeType) {
	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		10000,
	)

	camera.position.x += (mouseX - camera.position.x) * 0.05
	camera.lookAt(0, 0, 0)
	console.log(mouseX)

	return (
		<div className="w-full">
			<Canvas shadows>
				<fogExp2 />
				<PerspectiveCamera
					position={[(0.5 - x) * 3, 0.02, 12]}
					fov={30}
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
