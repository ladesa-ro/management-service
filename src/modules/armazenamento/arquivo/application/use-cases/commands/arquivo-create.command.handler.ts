import { writeFile } from "node:fs/promises";
import type { Readable } from "node:stream";
import { Inject, Injectable } from "@nestjs/common";
import jetpack from "fs-jetpack";
import { v4 } from "uuid";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";
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
    @Inject(IRuntimeOptionsToken)
    private runtimeOptions: IRuntimeOptions,
  ) {}

  private get storagePath() {
    return this.runtimeOptions.storagePath;
  }

  async execute({ dto, data }: IArquivoCreateCommand): Promise<{ id: string }> {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

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

  private async dataExists(id: string): Promise<false | "dir" | "file" | "other"> {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  private async dataSave(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<boolean> {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  private datGetFilePath(id: string): string {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }
}
