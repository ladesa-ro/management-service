import { Global, Module } from "@nestjs/common";
import { ConnectionHealthRegistry } from "./connection-health-registry";
import { IConnectionHealthRegistry } from "./connection-health-registry.interface";

@Global()
@Module({
  providers: [
    {
      provide: IConnectionHealthRegistry,
      useClass: ConnectionHealthRegistry,
    },
  ],
  exports: [IConnectionHealthRegistry],
})
export class ResilienceModule {}
