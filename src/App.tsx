import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Player from "./components/Player";
import Ground from "./components/Ground";
import FPV from "./components/FPV";

const sunPosition = [100, 100, 20] as const;
const lightIntensity = 0.5 as const;

const App = () => {
  return (
    <>
      <Canvas>
        <Sky sunPosition={sunPosition} />
        <ambientLight intensity={lightIntensity} />
        <FPV />
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="cursor absolute centered">+</div>
    </>
  );
};

export default App;
