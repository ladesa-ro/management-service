export const IConfigService = Symbol();

export interface IConfigService {
  get<T = unknown>(propertyPath: symbol | string): T | undefined;
}
