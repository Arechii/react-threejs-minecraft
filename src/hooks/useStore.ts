import { nanoid } from "nanoid";
import { Texture } from "../types";
import create from "zustand";

interface Cube {
  key: string;
  position: [number, number, number];
  texture: Texture;
}

interface State {
  texture: Texture;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: Texture) => void;
}

export const useStore = create<State>()(set => ({
  texture: Texture.Dirt,
  cubes: [],
  addCube: (x, y, z) => {
    set(prev => ({ ...prev, cubes: [...prev.cubes, { key: nanoid(), position: [x, y, z], texture: prev.texture }] }));
  },
  removeCube: (x, y, z) => {
    set(prev => ({
      ...prev,
      cubes: prev.cubes.filter(c => c.position[0] !== x || c.position[1] !== y || c.position[2] !== z)
    }));
  },
  setTexture: texture => {
    set(prev => ({ ...prev, texture }));
  },
  saveWorld: () => {},
  resetWorld: () => {}
}));
