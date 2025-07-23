import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication";
import { AppConfigModule } from "./config";
import { IntegrationsModule } from "./integrations";

@Module({
  imports: [AppConfigModule, IntegrationsModule, AuthenticationModule],
})
export class InfrastructureModule {}
