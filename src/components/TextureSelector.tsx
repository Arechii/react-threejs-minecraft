import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { Texture } from "../types";
import { getEnum } from "../util";

const images = {
  [Texture.Dirt]: "dirt.jpg",
  [Texture.Glass]: "glass.png",
  [Texture.Grass]: "grass.jpg",
  [Texture.Log]: "log.jpg",
  [Texture.Wood]: "wood.png"
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setActiveTexture] = useStore(state => [state.texture, state.setTexture]);
  const { Key1, Key2, Key3, Key4, Key5 } = useKeyboard();

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    setVisible(true);

    return () => clearTimeout(visibilityTimeout);
  }, [activeTexture]);

  useEffect(() => {
    const textures = {
      [Texture.Dirt]: Key1,
      [Texture.Glass]: Key2,
      [Texture.Grass]: Key3,
      [Texture.Log]: Key4,
      [Texture.Wood]: Key5
    };

    const pressedTexture = Object.entries(textures).find(([_, v]) => v);
    if (!pressedTexture) return;
    const texture = getEnum<Texture>(Texture, Number.parseInt(pressedTexture[0]));
    if (!texture) return;

    setActiveTexture(texture);
  }, [Key1, Key2, Key3, Key4, Key5, setActiveTexture]);

  return (
    <>
      {visible && (
        <div className="absolute centered texture-selector">
          {Object.entries(images).map(([k, v]) => (
            <img key={k} className="active" src={`/images/${v}`} alt={k} />
          ))}
        </div>
      )}
    </>
  );
};

export default TextureSelector;
