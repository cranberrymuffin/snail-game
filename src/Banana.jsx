import { Gltf, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Banana(props) {
    return (
        <Gltf position={props.position} scale={5} src={"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/banana/model.gltf"} />
    );
}
