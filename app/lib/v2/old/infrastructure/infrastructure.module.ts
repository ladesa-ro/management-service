import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/v2/infra/config";
import { AuthenticationModule } from "@/v2/old/infrastructure/authentication";
import { IntegrationsModule } from "@/v2/old/infrastructure/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
