import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class OfertaFormacaoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "oferta_formacao",
      {
        alias: "oferta_formacao",
        getQueryBuilder: () =>
          this.databaseContext.ofertaFormacaoRepository.createQueryBuilder("oferta_formacao"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
