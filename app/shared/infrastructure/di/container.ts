import { Container } from "inversify";

export const createContainer = () => {
  return new Container({ defaultScope: "Transient" });
};

export const registerMany = (registerables: ((container: Container) => any | Promise<any>)[]) => async (container: Container) => {
  for (const registerable of registerables) {
    await registerable(container);
  }
};
