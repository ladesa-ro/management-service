import { IStorageService } from "@/domain/abstractions/storage";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  IArquivoCreateCommand,
  IArquivoCreateCommandHandler,
} from "@/modules/armazenamento/arquivo/domain/commands";
import { IArquivoRepository } from "@/modules/armazenamento/arquivo/domain/repositories";

@DeclareImplementation()
export class ArquivoCreateCommandHandlerImpl implements IArquivoCreateCommandHandler {
  constructor(
    @DeclareDependency(IArquivoRepository)
    private arquivoRepository: IArquivoRepository,
    @DeclareDependency(IStorageService)
    private storageService: IStorageService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    { dto, data }: IArquivoCreateCommand,
  ): Promise<{ id: string }> {
    let id: string;

    do {
      id = generateUuidV7();
    } while (await this.storageService.exists(id));

    await this.storageService.save(id, data);

    const sizeBytes = 0;
    const mimeType = dto.mimeType;

    await this.arquivoRepository.save({
      id,
      name: dto.name ?? undefined,
      mimeType: mimeType ?? undefined,
      sizeBytes: sizeBytes,
      storageType: "filesystem",
    });

    return { id };
  }
}
