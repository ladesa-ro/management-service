import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

/**
 * Registra as ações de autorização do recurso Vinculo (Perfil).
 * Nota: A ação é "vinculo:find" mas usa perfilRepository.
 */
@Injectable()
export class PerfilAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "vinculo",
      {
        alias: "vinculo",
        getQueryBuilder: () => this.databaseContext.perfilRepository.createQueryBuilder("vinculo"),
      },
      { find: true },
    );
  }
}
