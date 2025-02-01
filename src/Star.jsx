import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

export default function Star(props) {
  const starRef = useRef();

  // Define a star shape
  const starShape = new THREE.Shape();
  const outerRadius = 1;
  const innerRadius = 0.5;
  const spikes = 5;

  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) {
      starShape.moveTo(x, y);
    } else {
      starShape.lineTo(x, y);
    }
  }
  starShape.closePath();

  return (
    <RigidBody type="fixed" colliders="hull" onCollisionEnter={({ manifold, target, other }) => {
      console.log(
        "Collision at world position ",
        manifold.solverContactPoint(0)
      );

      if (other.rigidBodyObject) {
        console.log(
          // this rigid body's Object3D
          target.rigidBodyObject.name,
          " collided with ",
          // the other rigid body's Object3D
          other.rigidBodyObject.name
        );
      }
    }}>
      <mesh ref={starRef} position={props.position}>
        <extrudeGeometry args={[starShape, { depth: 0.2, bevelEnabled: false }]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </RigidBody>
  );
}
