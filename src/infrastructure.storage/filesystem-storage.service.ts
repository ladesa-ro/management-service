import { writeFile } from "node:fs/promises";
import type { Readable } from "node:stream";
import jetpack, { createReadStream } from "fs-jetpack";
import type { IStorageService } from "@/domain/abstractions/storage";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";

@Impl()
export class FilesystemStorageService implements IStorageService {
  constructor(
    @Dep(IRuntimeOptionsToken)
    private runtimeOptions: IRuntimeOptions,
  ) {}

  private get storagePath() {
    return this.runtimeOptions.storagePath;
  }

  private getFilePath(id: string): string {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }

  async exists(id: string): Promise<boolean> {
    const fileFullPath = this.getFilePath(id);
    return !!jetpack.exists(fileFullPath);
  }

  async save(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<void> {
    const fileFullPath = this.getFilePath(id);
    await writeFile(fileFullPath, data);
  }

  async readAsStream(id: string): Promise<Readable | null> {
    const fileFullPath = this.getFilePath(id);

    if (jetpack.exists(fileFullPath)) {
      return createReadStream(fileFullPath);
    }

    return null;
  }
}
