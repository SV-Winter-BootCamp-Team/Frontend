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
					rotation-y={(0.5 - x) * 0.3}
				/>
				<ambientLight intensity={0.25 + (x * 3) / 4} />
				<pointLight position={[-7, 7, 8]} intensity={80} castShadow />
				<group position={[0, -0.2, 7]}>
					<mesh
						position={[0.55, -0.5, 0.45]}
						castShadow
						scale={[0.02, 1, 0.02]}
						rotation-x={-0.2}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
					<mesh
						position={[-0.55, -0.5, 0.45]}
						castShadow
						scale={[0.02, 1, 0.02]}
						rotation-x={-0.2}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
					<mesh
						position={[0.55, -0.5, -0.45]}
						castShadow
						scale={[0.02, 1, 0.02]}
						rotation-x={0.2}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
					<mesh
						position={[-0.55, -0.5, -0.45]}
						castShadow
						scale={[0.02, 1, 0.02]}
						rotation-x={0.2}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
					<mesh position={[0, 0, 0]} castShadow scale={[1.5, 0.01, 1]}>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
				</group>
				<group position={[0, 0.22, 7]} rotation={[0, -0.06, 0]}>
					<mesh
						position={[0, 0, 0]}
						castShadow
						scale={[0.75, 0.5, 0.01]}
						rotation={[-0.15, 0, 0]}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />

						<mesh
							position={[0, 0, 1]}
							castShadow
							scale={[0.95, 0.95, 0.5]}
							rotation={[0, 0, 0]}
						>
							<boxGeometry />
							<meshStandardMaterial color={'#66edfd'} />
						</mesh>
					</mesh>
					<mesh
						position={[0, -0.2, -0.01]}
						castShadow
						scale={[0.2, 0.4, 0.03]}
						rotation={[0, 0, 0]}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
					<mesh
						position={[0, -0.4, 0]}
						castShadow
						scale={[0.25, 0.025, 0.25]}
						rotation={[0, 0, 0]}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />
					</mesh>
				</group>
				<group>
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
				</group>
			</Canvas>
		</div>
	)
}
