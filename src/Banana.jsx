import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Banana(props) {
    const bananaRef = useRef();
    const [rotation, setRotation] = useState([0, 0, 0]); // Rotation as an array [x, y, z]

    useFrame(() => {
        if (bananaRef.current) {
            let newRotation = [...rotation]; // Copy current rotation
            newRotation[1] += 0.02
            setRotation(newRotation); // Update rotation state
        }

    });
    const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/banana/model.gltf");
    return <primitive object={scene} scale={5} position={props.position} ref={bananaRef} rotation={rotation} />;
}
