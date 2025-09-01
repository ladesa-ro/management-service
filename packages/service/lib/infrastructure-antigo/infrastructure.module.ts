import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@/infrastructure-antigo/authentication";
import { AppConfigModule } from "@/infrastructure-antigo/config";
import { IntegrationsModule } from "@/infrastructure-antigo/integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
