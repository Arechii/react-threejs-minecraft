export const getEnum = <T>(fromEnum: any, value: number | string) => {
  const key = Object.keys(fromEnum).find(k => fromEnum[k] === value);
  return (key as T) ?? null;
};
