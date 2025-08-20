import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/infrastructure/authentication";
import { AppConfigModule } from "@/infrastructure/config";
import { IntegrationsModule } from "@/infrastructure/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
