import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";

export const dirtTexture = new TextureLoader().load("images/dirt.jpg");
export const glassTexture = new TextureLoader().load("images/glass.png");
export const grassTexture = new TextureLoader().load("images/grass.jpg");
export const logTexture = new TextureLoader().load("images/log.jpg");
export const woodTexture = new TextureLoader().load("images/wood.png");
export const groundTexture = grassTexture;

const textures: { [key: string]: Texture } = {
  dirt: dirtTexture,
  glass: glassTexture,
  grass: grassTexture,
  log: logTexture,
  wood: woodTexture
};

Object.values(textures).forEach(texture => (texture.magFilter = NearestFilter));
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.repeat.set(100, 100);

export default textures;
