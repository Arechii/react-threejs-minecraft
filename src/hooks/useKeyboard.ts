import { useCallback, useEffect, useState } from "react";

enum Action {
  MoveForward = "KeyW",
  MoveBackward = "KeyS",
  MoveLeft = "KeyA",
  MoveRight = "KeyD",
  Jump = "Space",
  Key1 = "Digit1",
  Key2 = "Digit2",
  Key3 = "Digit3",
  Key4 = "Digit4",
  Key5 = "Digit5"
}

const getActionByKey = (key: string) => {
  const index = Object.values(Action).indexOf(key as Action);
  return Object.keys(Action)[index];
};

export const useKeyboard = () => {
  const [actions, setActions] = useState<{ [key in keyof typeof Action]: boolean }>({
    MoveForward: false,
    MoveBackward: false,
    MoveLeft: false,
    MoveRight: false,
    Jump: false,
    Key1: false,
    Key2: false,
    Key3: false,
    Key4: false,
    Key5: false
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = getActionByKey(e.code);
    if (!action) return;

    setActions(prev => ({ ...prev, [action]: true }));
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = getActionByKey(e.code);
    if (!action) return;

    setActions(prev => ({ ...prev, [action]: false }));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
