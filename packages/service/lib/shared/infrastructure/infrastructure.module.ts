import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/shared/infrastructure/authentication";
import { AppConfigModule } from "@/shared/infrastructure/config";
import { IntegrationsModule } from "@/shared/infrastructure/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
