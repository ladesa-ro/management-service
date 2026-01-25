import { writeFile } from "node:fs/promises";
import type { Readable } from "node:stream";
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  StreamableFile,
} from "@nestjs/common";
import jetpack, { createReadStream } from "fs-jetpack";
import { v4 } from "uuid";
import type { AccessContext } from "@/infrastructure/access-context";
import { AppConfigService } from "@/v2/infra/config";
import { UsuarioEntity, type ArquivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { isValidUuid } from "@/shared";
import type { ArquivoCreateInputDto } from "@/v2/adapters/in/http/arquivo/dto";
import type { IArquivoRepositoryPort } from "../ports";

type IGetFileAcesso = null | {
  nome?: string;
  id?: string;
};

@Injectable()
export class ArquivoService {
  constructor(
    @Inject("IArquivoRepositoryPort")
    private arquivoRepository: IArquivoRepositoryPort,
    @Inject(AppConfigService)
    private appConfigService: AppConfigService,
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
    id: string,
    acesso: IGetFileAcesso | null,
  ): Promise<{
    id: string;
    nome: string | null;
    mimeType: string | null;
    stream: Readable | null;
  }> {
    const qb = this.arquivoRepository.createQueryBuilder("arquivo");

    qb.where("arquivo.id = :arquivoId", { arquivoId: id });

    const exists = await qb.getExists();

    if (!exists) {
      throw new NotFoundException();
    }

    if (acesso) {
      if (acesso.nome === "bloco" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao").innerJoin("versao.imagem", "imagem").innerJoin("imagem.blocoCapa", "blocoCapa");

        if (accessContext) {
          await accessContext.applyFilter("bloco:find", qb, "blocoCapa", null);
        }

        qb.andWhere("blocoCapa.id = :blocoId", { blocoId: acesso.id });
      } else if (acesso.nome === "ambiente" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao").innerJoin("versao.imagem", "imagem").innerJoin("imagem.ambienteCapa", "ambienteCapa");

        if (accessContext) {
          await accessContext.applyFilter("ambiente:find", qb, "ambienteCapa", null);
        }

        qb.andWhere("ambienteCapa.id = :ambienteId", { ambienteId: acesso.id });
      } else if (acesso.nome === "usuario" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .leftJoin(UsuarioEntity, "usuario", "(usuario.id_imagem_capa_fk = imagem.id OR usuario.id_imagem_perfil_fk = imagem.id)");

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

  async getStreamableFile(accessContext: AccessContext | null, id: string, acesso: IGetFileAcesso | null): Promise<StreamableFile> {
    const file = await this.getFile(accessContext, id, acesso);

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

  async arquivoCreate(dto: Pick<ArquivoCreateInputDto, "name" | "mimeType">, data: NodeJS.ArrayBufferView | Readable): Promise<Pick<ArquivoEntity, "id">> {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

    // TODO: sizeBytes
    const sizeBytes = 0;
    // TODO: mimeType
    const mimeType = dto.mimeType;

    await this.arquivoRepository.save({
      id,

      name: dto.name ?? undefined,
      mimeType: mimeType ?? undefined,
      sizeBytes: sizeBytes,
      storageType: "filesystem",
    });

    return {
      id,
    };
  }

  private datGetFilePath(id: string): string {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }
}
