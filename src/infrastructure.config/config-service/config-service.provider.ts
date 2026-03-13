import { Provider } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { IConfigService as IConfigServiceToken } from "./config-service.interface";
import { ConfigServiceProxy } from "./config-service.proxy";

export const ConfigServiceProvider: Provider = {
  provide: IConfigServiceToken,
  useFactory: (nestConfigService: NestConfigService) => new ConfigServiceProxy(nestConfigService),
  inject: [NestConfigService],
};
