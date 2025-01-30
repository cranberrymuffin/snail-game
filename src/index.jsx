import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Snail from './Snail'
import Banana from './Banana'
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
        <Snail />
        <Banana position ={[0, 0, 0]}></Banana>
    </Canvas>
)