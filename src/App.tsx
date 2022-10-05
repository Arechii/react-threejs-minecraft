import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const sunPosition = [100, 100, 20];

const App = () => {
  return (
    <>
      <Canvas>
        <Sky sunPosition={sunPosition} />
      </Canvas>
    </>
  );
};

export default App;
