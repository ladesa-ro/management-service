import type { Provider } from "@nestjs/common";
import { EnvironmentConfigService } from "@/shared/infrastructure/config";
import { AppConfigService } from "../tokens";

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
};
