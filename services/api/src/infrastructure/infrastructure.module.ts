import { AuthenticationModule } from "@/infrastructure/authentication";
import { AppConfigModule } from "@/infrastructure/config";
import { IntegrationsModule } from "@/infrastructure/integrations";
import { Module } from "@nestjs/common";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
