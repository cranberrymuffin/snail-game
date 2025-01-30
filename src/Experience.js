import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";

const Directions = {
    NORTH: Symbol("north"),
    SOUTH: Symbol("south"),
    EAST: Symbol("east"),
    WEST: Symbol("west")
};

const SnailHead = () => {


    // State to keep track of the snail's position
    const [direction, setDirection] = useState(Directions.NORTH)
    const [position, setPosition] = useState([0, 0, 0]);
    const [rotation, setRotation] = useState([0, 0, 0]); // Rotation as an array [x, y, z]
    const { camera } = useThree();
    const snailRef = useRef();

    // This hook will update the camera's position each frame to follow the snail.
    useFrame(() => {
        if (snailRef.current) {
            camera.position.set(snailRef.current.position.x, snailRef.current.position.y + 2, snailRef.current.position.z + 5); // Set camera position relative to the snail's position
            camera.lookAt(snailRef.current.position); // Always look at the snail's position
        }
    });

    // Movement speed and turning step
    const moveAmount = 0.1;
    const turnAmount = Math.PI / 2; // 90 degrees

    // Effect to handle key press events for movement and turning
    useEffect(() => {

        const handleKeyDown = (event) => {
            let newPosition = [...position];
            let newRotation = [...rotation]; // Copy current rotation
            const moveForward = () => {
                newPosition[0] -= moveAmount * Math.sin(newRotation[1]); // Move forward along X
                newPosition[2] -= moveAmount * Math.cos(newRotation[1]); // Move forward along Z
            }
            // Move North
            if (event.key === "ArrowUp" || event.key === "w") {
                if (direction != Directions.NORTH) {
                    setDirection(Directions.NORTH)
                    newRotation[1] = 0
                } else {
                    moveForward()
                }
            }
            // Move South
            else if (event.key === "ArrowDown" || event.key === "s") {
                if (direction != Directions.SOUTH) {
                    setDirection(Directions.SOUTH)
                    newRotation[1] = Math.PI
                } else {
                    moveForward()
                }
            }
            // Turn left (counterclockwise)
            else if (event.key === "ArrowLeft" || event.key === "a") {
                if (direction != Directions.WEST) {
                    setDirection(Directions.WEST)
                    newRotation[1] = Math.PI / 2
                } else {
                    moveForward()
                }
            }
            // Move East
            else if (event.key === "ArrowRight" || event.key === "d") {
                if (direction != Directions.EAST) {
                    setDirection(Directions.EAST)
                    newRotation[1] = -Math.PI / 2
                } else {
                    moveForward()
                }
            }

            setPosition(newPosition); // Update position state
            setRotation(newRotation); // Update rotation state
        };
        // Add event listener for keydown
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [position, rotation]); // Depend on position and rotation to trigger re-render when they change


    /*
        // Effect to handle key press events for movement
        useEffect(() => {
            const handleKeyDown = (event) => {
                const moveAmount = 0.1; // How much the snail moves on each key press
                let newPosition = [...position];
                let newRotation = [...rotation]; // Copy current rotation
    
                if (event.key === "ArrowUp" || event.key === "w") {
                    newPosition[2] -= moveAmount; // Move up (Z axis)
                } else if (event.key === "ArrowDown" || event.key === "s") {
                    newPosition[2] += moveAmount; // Move down (Z axis)
                } else if (event.key === "ArrowLeft" || event.key === "a") {
                    newRotation[1] += Math.PI / 2; // Turn left (counterclockwise) around Y-axis
                } else if (event.key === "ArrowRight" || event.key === "d") {
                    newRotation[1] += Math.PI / 2; // Turn left (counterclockwise) around Y-axis
                }
    
                setPosition(newPosition); // Update position state
                setRotation(newRotation); // Update rotation state
            };
    
            // Add event listener for keydown
            window.addEventListener("keydown", handleKeyDown);
    
            // Cleanup the event listener on unmount
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [position]); // Depend on position to trigger re-render when position changes
    */
    return (
        <group position={position} ref={snailRef} rotation={rotation}>
            {/* Head (Sphere) */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="pink" />
            </mesh>

            {/* Left EyeStalks (Cylinder) */}
            <mesh position={[-0.5, 1.2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
                <meshStandardMaterial color="pink" />
            </mesh>
            {/* Left EyeStalks (Small Sphere) */}
            <mesh position={[-0.5, 2, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>

            {/* Right EyeStalks (Cylinder) */}
            <mesh position={[0.5, 1.2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
                <meshStandardMaterial color="pink" />
            </mesh>
            {/* Right EyeStalks (Small Sphere) */}
            <mesh position={[0.5, 2, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
            {/* Shell (Sphere) */}
            <mesh position={[0, -1, 1]} scale={[1, 2, 2]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
        </group>
    );
};


export default SnailHead;