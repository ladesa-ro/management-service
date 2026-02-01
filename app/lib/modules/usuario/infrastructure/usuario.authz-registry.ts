import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class UsuarioAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "usuario",
      {
        alias: "usuario",
        getQueryBuilder: () => this.databaseContext.usuarioRepository.createQueryBuilder("usuario"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
