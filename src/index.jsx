import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import SnailHead from './Experience'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>
        <color attach="background" args={["pink"]} />

        <ambientLight />
        {/* Directional Light */}
        <directionalLight
            position={[0, 5, 5]} // Position the light above and slightly in front of the snail
            intensity={1} // Brightness of the light
            castShadow // Enable shadows (optional)
        />
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1000, 1000]} /> {/* Width and height of the plane */}
            <meshStandardMaterial color="lightgreen" /> {/* Color of the plane */}
        </mesh>
        <SnailHead />
        {/* Sphere */}
        <mesh castShadow position={[-2, 0, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="white" />
        </mesh>

        {/* Cube */}
        <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="lightblue" />
        </mesh>

        {/* Torus */}
        <mesh castShadow position={[2, 0.3, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 100]} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    </Canvas>
)