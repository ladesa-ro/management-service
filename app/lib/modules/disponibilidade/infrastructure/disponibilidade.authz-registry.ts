import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class DisponibilidadeAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "disponibilidade",
      {
        alias: "disponibilidade",
        getQueryBuilder: () =>
          this.databaseContext.disponibilidadeRepository.createQueryBuilder("disponibilidade"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
