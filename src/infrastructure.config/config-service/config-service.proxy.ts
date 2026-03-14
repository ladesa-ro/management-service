import { ConfigService as NestConfigService } from "@nestjs/config";
import type { IConfigService } from "./config-service.interface";
import { ConfigTokensMap } from "./config-tokens-map";

export class ConfigServiceProxy implements IConfigService {
  constructor(private readonly inner: NestConfigService) {}

  get<T = any>(propertyPath: symbol | string): T | undefined {
    if (typeof propertyPath === "symbol") {
      const resolved = ConfigTokensMap.get(propertyPath);
      if (resolved === undefined) {
        throw new Error(
          `ConfigServiceProxy: unknown config token ${String(propertyPath)}. Add it to ConfigTokensMap.`,
        );
      }
      return this.inner.get<T>(resolved);
    }
    return this.inner.get<T>(propertyPath);
  }
}
