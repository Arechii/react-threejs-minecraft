import { usePlane } from "@react-three/cannon";
import { Vector2Tuple, Vector3Tuple } from "three";
import { groundTexture } from "../textures";

const dimensions: Vector2Tuple = [100, 100];
const position: Vector3Tuple = [0, 0, 0];
const rotation: Vector3Tuple = [-Math.PI / 2, 0, 0];

const Ground = () => {
  const [ref] = usePlane(() => ({ position, rotation }));

  return (
    <mesh ref={ref as any}>
      <planeGeometry attach="geometry" args={dimensions} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
