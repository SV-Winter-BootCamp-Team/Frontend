import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Link, useNavigate } from 'react-router-dom'
import {
	Environment,
	OrbitControls,
	useGLTF,
	useHelper,
	Text,
} from '@react-three/drei'
import { Canvas, Camera, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js'

RectAreaLightUniformsLib.init()

export default function ThreeTest(props: JSX.IntrinsicElements['mesh']) {
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	const nav = useNavigate()

	// load GLTF
	const chair = useLoader(
		GLTFLoader,
		'public/three_models/gltf/chair/scene.gltf',
	)
	const desk = useLoader(GLTFLoader, 'public/three_models/gltf/desk/scene.gltf')
	const computer = useLoader(
		GLTFLoader,
		'public/three_models/gltf/computer/scene.gltf',
	)
	const whale = useLoader(
		GLTFLoader,
		'public/three_models/gltf/whale/scene.gltf',
	)
	const cloud1 = useLoader(
		GLTFLoader,
		'public/three_models/gltf/cloud/scene.gltf',
	)
	const bridge = useLoader(
		GLTFLoader,
		'public/three_models/gltf/bridge/scene.gltf',
	)

	const meshRef = useRef()
	const textRef = useRef()
	const light = useRef()
	const monitor = useRef()

	useHelper(light, THREE.SpotLightHelper)
	useHelper(monitor, RectAreaLightHelper)

	window.addEventListener('scroll', () => {
		meshRef.current.position.z = window.scrollY / 7700 + 3
		meshRef.current.position.y = -window.scrollY / 1050 - 2
		textRef.current.position.y = window.scrollY / 100 + 4.5
		meshRef.current.rotation.y = window.scrollY * (Math.PI / 990)
	})

	useFrame((state) => {
		const whalePivot = state.scene.getObjectByName('whalePivot')

		whalePivot?.children[0].getWorldPosition(light.current.target.position)
	})

	return (
		<>
			{/* <OrbitControls /> */}

			<mesh ref={meshRef} position={[0, -2, 3]}>
				<Environment files={'public/three_models/hdr/studio_small_09_4k.hdr'} />
				<spotLight
					ref={light}
					intensity={50000}
					color={0x7aa1cd}
					position={[0, 20, 50]}
					angle={THREE.MathUtils.degToRad(90)}
				/>
				<group>
					<Text ref={textRef} color={'white'} position={[0.02, 4.5, -3.94]}>
						Hello!
					</Text>
					<Text
						color={'white'}
						position={[0, 30, 60]}
						fontSize={15}
						rotation={[0, Math.PI, 0]}
					>
						Make Your Own Background!
					</Text>
				</group>
				<rectAreaLight
					ref={monitor}
					position={[0.02, 2.5, -3.94]}
					width={3.32}
					height={1.9}
					intensity={50}
					color="#CB96EF"
					rotation-x={Math.PI}
				/>
				<primitive
					object={chair.scene}
					scale={4}
					rotation-y={Math.PI}
					position={[0, -2, -1]}
					onPointerOver={(e) => setHover(true)}
					onPointerOut={(e) => setHover(false)}
				/>
				<primitive
					object={desk.scene}
					scale={4}
					position={[1.5, -2, -3.5]}
					onPointerOver={(e) => setHover(true)}
					onPointerOut={(e) => setHover(false)}
				/>
				<primitive
					object={computer.scene}
					scale={1}
					position={[0, 1.19, -4]}
					onPointerOver={(e) => setHover(true)}
					onPointerOut={(e) => setHover(false)}
					onClick={(e) =>
						nav({
							pathname: `/signup`,
						})
					}
				/>
				<group name="whalePivot">
					<primitive
						object={whale.scene}
						scale={15}
						position={[0, 25, 90]}
						onPointerOver={(e) => setHover(true)}
						onPointerOut={(e) => setHover(false)}
					/>
				</group>
				<primitive
					object={cloud1.scene}
					scale={15}
					position={[0, 25, 90]}
					onPointerOver={(e) => setHover(true)}
					onPointerOut={(e) => setHover(false)}
				/>
				<primitive
					object={bridge.scene}
					scale={10}
					position={[-200, -50, 60]}
					onPointerOver={(e) => setHover(true)}
					onPointerOut={(e) => setHover(false)}
				/>
			</mesh>
		</>
	)
}
