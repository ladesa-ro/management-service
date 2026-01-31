import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/server/nest/modules/config";
import { AuthenticationModule } from "@/v2/old/infrastructure/authentication";
import { IntegrationsModule } from "@/v2/old/infrastructure/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
