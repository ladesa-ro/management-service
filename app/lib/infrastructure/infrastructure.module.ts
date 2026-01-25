import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/infrastructure/authentication";
import { AppConfigModule } from "@/v2/infra/config";
import { IntegrationsModule } from "@/infrastructure/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
