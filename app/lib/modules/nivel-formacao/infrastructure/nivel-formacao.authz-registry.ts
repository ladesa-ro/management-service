import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class NivelFormacaoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "nivel_formacao",
      {
        alias: "nivel_formacao",
        getQueryBuilder: () =>
          this.databaseContext.nivelFormacaoRepository.createQueryBuilder("nivel_formacao"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
