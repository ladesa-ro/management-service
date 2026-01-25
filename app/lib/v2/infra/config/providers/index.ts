import type { Provider } from "@nestjs/common";
import { AppConfigService } from "../tokens";
import { EnvironmentConfigService } from "@/v2/adapters/out/config";

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
};
