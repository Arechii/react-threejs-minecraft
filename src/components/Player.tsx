import { useFrame, useThree } from "@react-three/fiber";
import { SphereProps, useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3, Vector3Tuple } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const speed = 4 as const;
const jumpForce = 4 as const;
const mass = 1 as const;
const type: SphereProps["type"] = "Dynamic" as const;
const spherePosition: Vector3Tuple = [0, 1, 0];

const Player = () => {
  const { MoveForward, MoveBackward, MoveLeft, MoveRight, Jump } = useKeyboard();
  const { camera } = useThree();
  const [ref, sphere] = useSphere(() => ({ mass, type, position: spherePosition }));
  const position = useRef([0, 0, 0]);
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    sphere.position.subscribe(p => (position.current = p));
  }, [sphere.position]);

  useEffect(() => {
    sphere.velocity.subscribe(v => (velocity.current = v));
  }, [sphere.velocity]);

  useFrame(() => {
    const [x, y, z] = position.current;
    const [vx, vy, vz] = velocity.current;
    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, (MoveBackward ? 1 : 0) - (MoveForward ? 1 : 0));
    const sideVector = new Vector3((MoveLeft ? 1 : 0) - (MoveRight ? 1 : 0), 0, 0);

    camera.position.copy(new Vector3(x, y, z));
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation);
    sphere.velocity.set(direction.x, vy, direction.z);

    if (Jump && Math.abs(vy) < 0.05) {
      sphere.velocity.set(vx, jumpForce, vz);
    }
  });

  return <mesh ref={ref as any} />;
};

export default Player;
