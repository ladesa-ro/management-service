import { Container } from "inversify";

export const createContainer = () => {
  return new Container({ defaultScope: "Transient" });
};

export type ContainerRegister = (container: Container) => any | Promise<any>;

export const registerMany = (registerables: ContainerRegister[]) => async (container: Container) => {
  for (const registerable of registerables) {
    await registerable(container);
  }
};

export const createContainerRegister = (fn: ContainerRegister) => {
  return fn;
};
