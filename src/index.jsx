import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Snail from './Snail'
import { OrbitControls } from '@react-three/drei'
import Star from './Star'
import { Physics, RigidBody } from '@react-three/rapier'
const root = ReactDOM.createRoot(document.querySelector('#root'))


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
root.render(
    <Canvas>
        <color attach="background" args={["lightblue"]} />
        <directionalLight
            position={[1000, 1000, 1000]}
            intensity={1}
            castShadow
        />
        <directionalLight
            position={[-1000, 1000, -1000]}
            intensity={1}
            castShadow
        />
        <directionalLight
            position={[-1000, 1000, 1000]}
            intensity={1}
            castShadow
        />
        <directionalLight
            position={[1000, 1000, -1000]}
            intensity={1} // Brightness of the light
            castShadow
        />
        <Physics>
            <RigidBody type="fixed">
                <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} >
                    <planeGeometry args={[1000, 1000]} /> {/* Width and height of the plane */}
                    <meshStandardMaterial color="limegreen" /> {/* Color of the plane */}
                </mesh>
            </RigidBody>
            <Snail />
            {[...Array(1000)].map((x, i) =>
                <Star key={i} position={[getRandomNumber(-500, 500), 1, getRandomNumber(-500, 500)]} />
            )}
        </Physics>
        <OrbitControls />
    </Canvas>
)