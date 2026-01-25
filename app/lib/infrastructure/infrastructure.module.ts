import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/infrastructure/authentication";
import { IntegrationsModule } from "@/infrastructure/integrations";
import { AppConfigModule } from "@/v2/infra/config";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
