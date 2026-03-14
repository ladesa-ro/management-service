import { Inject, Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { IStorageService } from "@/domain/abstractions/storage";
import type {
  IArquivoCreateCommand,
  IArquivoCreateCommandHandler,
} from "@/modules/armazenamento/arquivo/domain/commands";
import { IArquivoRepository } from "@/modules/armazenamento/arquivo/domain/repositories";

@Injectable()
export class ArquivoCreateCommandHandlerImpl implements IArquivoCreateCommandHandler {
  constructor(
    @Inject(IArquivoRepository)
    private arquivoRepository: IArquivoRepository,
    @Inject(IStorageService)
    private storageService: IStorageService,
  ) {}

  async execute({ dto, data }: IArquivoCreateCommand): Promise<{ id: string }> {
    let id: string;

    do {
      id = v4();
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
