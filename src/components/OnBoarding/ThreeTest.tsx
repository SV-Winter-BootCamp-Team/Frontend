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
					position={[(x - 0.5) * 3, 0.02, 12]}
					fov={30}
					makeDefault
					rotation-y={(x - 0.5) * 1.25}
				/>
				<ambientLight intensity={0.25 + ((1 - x) * 3) / 4} />
				<pointLight position={[-7, 7, 8]} intensity={80} castShadow />
				<group position={[0, -0.2, 9.5]}>
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
					<mesh position={[0, -0.005, 0]} scale={[1.5, 0.01, 1]}>
						<boxGeometry />
						<meshStandardMaterial color={'#dcd0bc'} />
					</mesh>
					<mesh
						position={[0, 0, 0]}
						rotation-x={-Math.PI / 2}
						castShadow
						receiveShadow
					>
						<planeGeometry args={[1.5, 1]} />
						<meshStandardMaterial color={'#dcd0bc'} />
					</mesh>

					<group
						position={[-0.6, x * 0.02 - 0.03, -0.3]}
						scale={[0.3 * x, 0.01 * x, 0.3 * x]}
						rotation-x={0}
					>
						<mesh rotation-y={0.2} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.35} position-y={1} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.3} position-y={2} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.25} position-y={3} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.22} position-y={4} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.24} position-y={5} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.14} position-y={6} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.2} position-y={7} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.19} position-y={8} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
						<mesh rotation-y={0.4} position-y={9} castShadow>
							<boxGeometry />
							<meshStandardMaterial color={'#d4d4d4'} />
						</mesh>
					</group>
				</group>

				<group position={[0, 0.2, 9.5]}>
					<mesh
						position={[0, 0, 0]}
						castShadow
						scale={[0.75, 0.5, 0.01]}
						rotation={[-0.15, 0, 0]}
					>
						<boxGeometry />
						<meshStandardMaterial color={'#d4d4d4'} />

						<mesh
							position={[0, 0, 1 - x]}
							castShadow
							scale={[0.95, (1 - x) * 0.9, 0.5]}
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
							shininess={25}
						/>
					</mesh>
					<mesh position={[0, 0, -5]} receiveShadow={true}>
						<planeGeometry args={[200, 200]} />
						<meshPhongMaterial
							color={color}
							specular={'skyblue'}
							shininess={10}
						/>
					</mesh>
				</group>
			</Canvas>
		</div>
	)
}
