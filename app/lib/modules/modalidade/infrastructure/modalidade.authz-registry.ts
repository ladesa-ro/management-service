import { Injectable, OnModuleInit } from "@nestjs/common";
import { ResourceAuthzRegistry } from "@/modules/@core/access-context";
import { DatabaseContextService } from "@/modules/@database-context";

@Injectable()
export class ModalidadeAuthzRegistrySetup implements OnModuleInit {
  constructor(
    private readonly registry: ResourceAuthzRegistry,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  onModuleInit() {
    this.registry.register(
      "modalidade",
      {
        alias: "modalidade",
        getQueryBuilder: () =>
          this.databaseContext.modalidadeRepository.createQueryBuilder("modalidade"),
      },
      { find: true, update: true, delete: true },
    );
  }
}
