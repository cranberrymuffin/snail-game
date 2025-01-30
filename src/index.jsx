import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Snail from './Snail'
import Banana from './Banana'
import { OrbitControls } from '@react-three/drei'
const root = ReactDOM.createRoot(document.querySelector('#root'))


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
root.render(
    <Canvas>
        <color attach="background" args={["lightblue"]} />

        {/* Directional Light */}
        <directionalLight
            position={[0, 1000, 1000]} // Position the light above and slightly in front of the snail
            intensity={2.5} // Brightness of the light
            castShadow // Enable shadows (optional)
        />
        <directionalLight
            position={[0, -1000, -1000]} // Position the light above and slightly in front of the snail
            intensity={2.5} // Brightness of the light
            castShadow // Enable shadows (optional)
        />
        <directionalLight
            position={[0, -1000, 1000]} // Position the light above and slightly in front of the snail
            intensity={2.5} // Brightness of the light
            castShadow // Enable shadows (optional)
        />
        <directionalLight
            position={[0, 0, 1000, -1000]} // Position the light above and slightly in front of the snail
            intensity={2.5} // Brightness of the light
            castShadow // Enable shadows (optional)
        />
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1000, 1000]} /> {/* Width and height of the plane */}
            <meshStandardMaterial color="lightgreen" /> {/* Color of the plane */}
        </mesh>
        <Snail />
        {[...Array(5000)].map((x, i) =>
            <Banana key={i} position={[getRandomNumber(-500,500), 0, getRandomNumber(-500,500)]}></Banana>
        )}
        <OrbitControls/>
    </Canvas>
)