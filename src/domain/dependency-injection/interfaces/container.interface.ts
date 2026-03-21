export const IContainer = Symbol("IContainer");

export interface IContainer {
  get<T>(token: any): T;
}
