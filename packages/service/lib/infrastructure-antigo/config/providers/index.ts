import type { Provider } from "@nestjs/common";
import { EnvironmentConfigService } from "@/infrastructure-antigo/config";
import { AppConfigService } from "../tokens";

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
};
