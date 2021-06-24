export type AsyncFunc<T> = () => Promise<T>;

export type Options = {
  args: string[];
  w3c: boolean;
};
