export const IConfigService = Symbol();

export interface IConfigService {
  get<T = any>(propertyPath: string): T | undefined;
}
