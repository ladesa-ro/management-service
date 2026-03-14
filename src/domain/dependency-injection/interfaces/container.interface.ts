export interface IContainer {
  get<T>(token: any): T;
}

export const IContainer = Symbol("IContainer");
