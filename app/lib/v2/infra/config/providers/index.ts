import type { Provider } from "@nestjs/common";
import { EnvironmentConfigService } from "@/v2/adapters/out/config";
import { AppConfigService } from "../tokens";

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
};
