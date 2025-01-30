import { Gltf } from "@react-three/drei";

export default function Banana(props) {
    return (
        <Gltf position={props.position} scale={5} src={"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/banana/model.gltf"} />
    );
}
