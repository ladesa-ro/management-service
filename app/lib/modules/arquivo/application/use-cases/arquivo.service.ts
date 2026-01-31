import { writeFile } from "node:fs/promises";
import type { Readable } from "node:stream";
import {
  ForbiddenException,
  Inject,
  Injectable,
  ServiceUnavailableException,
  StreamableFile,
} from "@nestjs/common";
import jetpack, { createReadStream } from "fs-jetpack";
import { v4 } from "uuid";
import { isValidUuid, ResourceNotFoundError } from "@/modules/@shared";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import type { ArquivoCreateInput, ArquivoGetFileInput } from "@/modules/arquivo/application/dtos";
import {
  ARQUIVO_REPOSITORY_PORT,
  type IArquivoRepositoryPort,
  type IArquivoUseCasePort,
} from "@/modules/arquivo/application/ports";
import { UsuarioEntity } from "@/modules/usuario/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class ArquivoService implements IArquivoUseCasePort {
  constructor(
    @Inject(ARQUIVO_REPOSITORY_PORT)
    private arquivoRepository: IArquivoRepositoryPort,
    @Inject(CONFIG_PORT)
    private appConfigService: IConfigPort,
  ) {}

  private get storagePath() {
    return this.appConfigService.getStoragePath();
  }

  async dataExists(id: string): Promise<false | "dir" | "file" | "other"> {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  async dataReadAsStream(id: string): Promise<Readable | null> {
    if (await this.dataExists(id)) {
      const fileFullPath = this.datGetFilePath(id);
      const fileReadStream = createReadStream(fileFullPath);
      return fileReadStream;
    }

    return null;
  }

  async getFile(
    accessContext: AccessContext | null,
    input: ArquivoGetFileInput,
  ): Promise<{
    id: string;
    nome: string | null;
    mimeType: string | null;
    stream: Readable | null;
  }> {
    const { id, acesso } = input;
    const qb = this.arquivoRepository.createQueryBuilder("arquivo");

    qb.where("arquivo.id = :arquivoId", { arquivoId: id });

    const exists = await qb.getExists();

    if (!exists) {
      throw new ResourceNotFoundError("Arquivo", id);
    }

    if (acesso) {
      if (acesso.nome === "bloco" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.blocoCapa", "blocoCapa");

        if (accessContext) {
          await accessContext.applyFilter("bloco:find", qb, "blocoCapa", null);
        }

        qb.andWhere("blocoCapa.id = :blocoId", { blocoId: acesso.id });
      } else if (acesso.nome === "ambiente" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.ambienteCapa", "ambienteCapa");

        if (accessContext) {
          await accessContext.applyFilter("ambiente:find", qb, "ambienteCapa", null);
        }

        qb.andWhere("ambienteCapa.id = :ambienteId", { ambienteId: acesso.id });
      } else if (acesso.nome === "usuario" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .leftJoin(
            UsuarioEntity,
            "usuario",
            "(usuario.id_imagem_capa_fk = imagem.id OR usuario.id_imagem_perfil_fk = imagem.id)",
          );

        if (accessContext) {
          await accessContext.applyFilter("usuario:find", qb, "usuario", null);
        }

        qb.andWhere("usuario.id = :usuarioId", { usuarioId: acesso.id });
      } else {
        qb.andWhere("FALSE");
      }
    }

    qb.andWhere("arquivo.id = :arquivoId", { arquivoId: id });

    const arquivo = await qb.getOne();

    if (!arquivo) {
      throw new ForbiddenException();
    }

    if (!(await this.dataExists(id))) {
      throw new ServiceUnavailableException();
    }

    const stream = await this.dataReadAsStream(id);

    return {
      id: arquivo.id,
      nome: arquivo.name,
      mimeType: arquivo.mimeType,
      stream,
    };
  }

  async getStreamableFile(
    accessContext: AccessContext | null,
    input: ArquivoGetFileInput,
  ): Promise<StreamableFile> {
    const file = await this.getFile(accessContext, input);

    if (!file.stream) {
      throw new ServiceUnavailableException();
    }

    return new StreamableFile(file.stream, {
      type: file.mimeType ?? undefined,
      disposition: `attachment; filename="${encodeURIComponent(file.nome ?? file.id)}"`,
    });
  }

  async dataSave(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<boolean> {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  async arquivoCreate(
    dto: Pick<ArquivoCreateInput, "name" | "mimeType">,
    data: NodeJS.ArrayBufferView | Readable,
  ): Promise<{ id: string }> {
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

  private datGetFilePath(id: string): string {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }
}
