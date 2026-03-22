export const IContainer = Symbol("IContainer");

export interface IContainer {
  get<T>(token: string | symbol | (abstract new (...args: unknown[]) => T)): T;
}
