import { usePlane } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { useCallback } from "react";
import { Vector2Tuple, Vector3Tuple } from "three";
import { useStore } from "../hooks/useStore";
import { groundTexture } from "../textures";

const dimensions: Vector2Tuple = [100, 100];
const position: Vector3Tuple = [0, 0.5, 0];
const rotation: Vector3Tuple = [-Math.PI / 2, 0, 0];

const Ground = () => {
  const [ref] = usePlane(() => ({ position, rotation }));
  const addCube = useStore(state => state.addCube);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      const [x, y, z] = Object.values(e.point).map(v => Math.ceil(v));
      addCube(x, y, z);
    },
    [addCube]
  );

  return (
    <mesh ref={ref as any} onClick={handleClick}>
      <planeGeometry attach="geometry" args={dimensions} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
