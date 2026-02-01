import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class OfertaFormacaoNivelFormacaoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "oferta_formacao_nivel_formacao",
      {
        alias: "oferta_formacao_nivel_formacao",
        getQueryBuilder: () =>
          this.databaseContext.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
            "oferta_formacao_nivel_formacao",
          ),
      },
      { find: true, update: true, delete: true },
    );
  }
}
