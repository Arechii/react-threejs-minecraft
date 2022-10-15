import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useMemo, useState } from "react";
import { useStore } from "../hooks/useStore";
import textures from "../textures";
import { Texture } from "../types";
import { getEnumKey } from "../util";

interface CubeProps {
  position: [number, number, number];
  texture: Texture;
}

const Cube = ({ position, texture: textureProp }: CubeProps) => {
  const [ref] = useBox(() => ({ type: "Static", position }));
  const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (e.faceIndex == null || ref.current == null) return;

      const clickedFace = Math.floor(e.faceIndex / 2);
      const { x, y, z } = ref.current.position;

      // @ts-ignore
      if (e.altKey) {
        return removeCube(x, y, z);
      }

      switch (clickedFace) {
        case 0:
          return addCube(x + 1, y, z);
        case 1:
          return addCube(x - 1, y, z);
        case 2:
          return addCube(x, y + 1, z);
        case 3:
          return addCube(x, y - 1, z);
        case 4:
          return addCube(x, y, z + 1);
        default:
          return addCube(x, y, z - 1);
      }
    },
    [addCube, removeCube, ref]
  );

  const handleHover = useCallback((e: ThreeEvent<PointerEvent>, state: boolean) => {
    e.stopPropagation();
    setIsHovered(state);
  }, []);

  const texture = useMemo(() => {
    const type = getEnumKey(Texture, textureProp);
    return type ? textures[type as keyof typeof Texture] : null;
  }, [textureProp]);

  return (
    <mesh
      ref={ref as any}
      onClick={handleClick}
      onPointerMove={e => handleHover(e, true)}
      onPointerOut={e => handleHover(e, false)}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        map={texture}
        color={isHovered ? "grey" : "white"}
        transparent={true}
        opacity={textureProp === Texture.Glass ? 0.6 : 1}
      />
    </mesh>
  );
};

export default Cube;
