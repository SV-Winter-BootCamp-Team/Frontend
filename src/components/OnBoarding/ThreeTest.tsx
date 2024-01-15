import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import {
	Environment,
	OrbitControls,
	useGLTF,
	useHelper,
	Text,
} from '@react-three/drei'
import { Canvas, Camera, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js'

RectAreaLightUniformsLib.init()

export default function ThreeTest(props: JSX.IntrinsicElements['mesh']) {
	const nav = useNavigate()

	// load GLTF
	const desk = useLoader(
		GLTFLoader,
		'public/three_models/gltf/office/Messy Office.glb',
	)
	const computer = useLoader(
		GLTFLoader,
		'public/three_models/gltf/computer/scene.gltf',
	)

	const meshRef = useRef()
	const textRef = useRef()
	const monitor = useRef()
	const groupRef = useRef()

	// useFrame((state) => {
	// 	meshRef.current.position.z +=
	// })

	return (
		<>
			<Canvas camera={{ position: [0, 0, 0] }}>
				<mesh ref={meshRef} position={[0, -2, 3]}>
					<ambientLight intensity={5} />
					{/* <rectAreaLight
						ref={monitor}
						position={[0.027, 2.5, -3.94]}
						width={3.34}
						height={1.9}
						intensity={2}
						color="#fff"
						rotation-x={Math.PI}
					/> */}
					<Text ref={textRef} color={'white'} position={[0.02, 4.5, -3.94]}>
						Hello!
					</Text>
					{/* <primitive
						object={chair.scene}
						scale={4}
						rotation-y={Math.PI}
						position={[0, -2, -1]}
					/> */}
					<primitive
						object={desk.scene}
						scale={33.5}
						position={[-8, -2, -3.5]}
						rotation-y={(Math.PI * 3) / 2}
					/>
					<primitive
						object={computer.scene}
						scale={1}
						position={[0, 1.19, -4]}
						onClick={(e) =>
							nav({
								pathname: `/signup`,
							})
						}
					/>
				</mesh>
			</Canvas>
		</>
	)
}
