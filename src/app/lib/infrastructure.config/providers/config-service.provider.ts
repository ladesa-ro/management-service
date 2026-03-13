import { Provider } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { IConfigService as IConfigServiceToken } from "../config-service.interface";

export const ConfigServiceProvider: Provider = {
  provide: IConfigServiceToken,
  useExisting: NestConfigService,
};
