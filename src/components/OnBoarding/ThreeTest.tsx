import { Canvas, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { HandleThreeType } from './OnBoardingTemplate'
import GLTFLoader from 'three-gltf-loader'

export default function ThreeTest({ color, x }: HandleThreeType) {
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
				<pointLight position={[-7, 7, 7]} intensity={100} castShadow />
				<mesh position={[0, -1, 0]} castShadow>
					<boxGeometry />
					<meshStandardMaterial color={'#d4d4d4'} />
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
				<mesh position={[0, 0, -3]} receiveShadow={true}>
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
