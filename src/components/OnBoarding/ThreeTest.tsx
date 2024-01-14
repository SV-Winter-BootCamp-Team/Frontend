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
	const chair = useLoader(
		GLTFLoader,
		'public/three_models/gltf/chair/scene.gltf',
	)
	const desk = useLoader(
		GLTFLoader,
		'public/three_models/gltf/office/Messy Office.glb',
	)
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
	const monitor = useRef()
	const groupRef = useRef()

	// useHelper(light, THREE.SpotLightHelper)
	// useHelper(monitor, RectAreaLightHelper)

	useFrame((state) => {
		meshRef.current.position.z = window.scrollY / 7700 + 3
		meshRef.current.position.y = -window.scrollY / 1050 - 2
		meshRef.current.rotation.y = -window.scrollY * (Math.PI / 990)
		textRef.current.position.y = window.scrollY / 100 + 4.5
		groupRef.current.position.y = (-window.scrollY + 1250) / 5
	})

	return (
		<>
			{/* <OrbitControls /> */}

			<mesh ref={meshRef} position={[0, -2, 3]}>
				<Environment files={'public/three_models/hdr/studio_small_09_4k.hdr'} />
				<rectAreaLight
					ref={monitor}
					position={[0.027, 2.5, -3.94]}
					width={3.34}
					height={1.9}
					intensity={2}
					color="#fff"
					rotation-x={Math.PI}
				/>
				<Text ref={textRef} color={'white'} position={[0.02, 4.5, -3.94]}>
					Hello!
				</Text>
				<Text
					color={'white'}
					position={[0, 30, 160]}
					fontSize={25}
					rotation={[0, Math.PI, 0]}
				>
					Make Your Own Background!
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
				<group ref={groupRef}>
					<primitive object={whale.scene} scale={30} position={[0, 25, 190]} />
					<primitive object={cloud1.scene} scale={15} position={[0, 25, 160]} />
				</group>
				<primitive
					object={bridge.scene}
					scale={10}
					position={[-200, -50, 160]}
				/>
			</mesh>
		</>
	)
}
