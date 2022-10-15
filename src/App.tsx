import { Physics } from "@react-three/cannon";
import { Sky, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Player from "./components/Player";
import Ground from "./components/Ground";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";
import TextureSelector from "./components/TextureSelector";

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
          <Cubes />
          <Ground />
        </Physics>
        <Stats />
      </Canvas>
      <div className="cursor absolute centered">+</div>
      <TextureSelector />
    </>
  );
};

export default App;
