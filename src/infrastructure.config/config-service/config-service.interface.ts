export const IConfigService = Symbol();

export interface IConfigService {
  get<T = any>(propertyPath: symbol | string): T | undefined;
}
