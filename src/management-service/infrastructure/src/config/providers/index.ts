import { EnvironmentConfigService } from "@/config";
import type { Provider } from "@nestjs/common";
import { AppConfigService } from "../tokens";

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
};
