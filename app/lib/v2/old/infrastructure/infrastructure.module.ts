import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/v2/old/infrastructure/authentication";
import { IntegrationsModule } from "@/v2/old/infrastructure/integrations";
import { AppConfigModule } from "@/v2/infra/config";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
