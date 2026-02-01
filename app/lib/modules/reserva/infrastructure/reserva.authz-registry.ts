import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class ReservaAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "reserva",
      {
        alias: "reserva",
        getQueryBuilder: () => this.databaseContext.reservaRepository.createQueryBuilder("reserva"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
