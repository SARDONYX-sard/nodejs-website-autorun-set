type AsyncFunc<T> = () => Promise<T>;

type Options = {
  args: string[];
  w3c: boolean;
};
