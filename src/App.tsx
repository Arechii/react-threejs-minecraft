import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Player from "./components/Player";
import Ground from "./components/Ground";

const sunPosition = [100, 100, 20] as const;
const lightIntensity = 0.5 as const;

const App = () => {
  return (
    <>
      <Canvas>
        <Sky sunPosition={sunPosition} />
        <ambientLight intensity={lightIntensity} />
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
};

export default App;
