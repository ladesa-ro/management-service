import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class EnderecoAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "endereco",
      {
        alias: "endereco",
        getQueryBuilder: () =>
          this.databaseContext.enderecoRepository.createQueryBuilder("endereco"),
      },
      { find: true },
    );
  }
}
