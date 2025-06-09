import { writeFile } from "node:fs/promises";
import type { Readable } from "node:stream";
import type { AccessContext } from "@/infrastructure/access-context";
import { AppConfigService } from "@/infrastructure/config";
import { isValidUuid } from "@/infrastructure/fixtures/validation/isValidUuid";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { type ArquivoEntity, UsuarioEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { ForbiddenException, Inject, Injectable, NotFoundException, ServiceUnavailableException, StreamableFile } from "@nestjs/common";
import jetpack, { createReadStream } from "fs-jetpack";
import { v4 } from "uuid";

type IGetFileAcesso = null | {
  nome?: string;
  id?: string;
};

@Injectable()
export class ArquivoService {
  constructor(
    private databaseContextService: DatabaseContextService,

    @Inject(AppConfigService)
    private appConfigService: AppConfigService,
  ) {}

  get arquivoRepository() {
    return this.databaseContextService.arquivoRepository;
  }

  private get storagePath() {
    return this.appConfigService.getStoragePath();
  }

  async dataExists(id: LadesaTypings.Arquivo["id"]) {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  async dataReadAsStream(id: LadesaTypings.Arquivo["id"]): Promise<Readable | null> {
    if (await this.dataExists(id)) {
      const fileFullPath = this.datGetFilePath(id);
      const fileReadStream = createReadStream(fileFullPath);
      return fileReadStream;
    }

    return null;
  }

  async getFile(accessContext: AccessContext | null, id: LadesaTypings.Arquivo["id"], acesso: IGetFileAcesso | null) {
    const qb = this.arquivoRepository.createQueryBuilder("arquivo");

    qb.where("arquivo.id = :arquivoId", { arquivoId: id });

    const exists = await qb.getExists();

    if (!exists) {
      throw new NotFoundException();
    }

    if (acesso) {
      if (acesso.nome === "bloco" && isValidUuid(acesso.id)) {
        qb
          //
          .innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.blocoCapa", "blocoCapa");

        if (accessContext) {
          await accessContext.applyFilter("bloco:find", qb, "blocoCapa", null);
        }

        qb.andWhere("blocoCapa.id = :blocoId", { blocoId: acesso.id });
      } else if (acesso.nome === "ambiente" && isValidUuid(acesso.id)) {
        qb
          //
          .innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.ambienteCapa", "ambienteCapa");

        if (accessContext) {
          await accessContext.applyFilter("ambiente:find", qb, "ambienteCapa", null);
        }

        qb.andWhere("ambienteCapa.id = :ambienteId", { ambienteId: acesso.id });
      } else if (acesso.nome === "usuario" && isValidUuid(acesso.id)) {
        qb
          //
          .innerJoin("arquivo.versao", "versao")
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

  async getStreamableFile(accessContext: AccessContext | null, id: LadesaTypings.Arquivo["id"], acesso: IGetFileAcesso | null) {
    const file = await this.getFile(accessContext, id, acesso);

    if (!file.stream) {
      throw new ServiceUnavailableException();
    }

    return new StreamableFile(file.stream, {
      type: file.mimeType ?? undefined,
      disposition: `attachment; filename="${encodeURIComponent(file.nome ?? file.id)}"`,
    });
  }

  async dataSave(id: LadesaTypings.Arquivo["id"], data: NodeJS.ArrayBufferView | Readable) {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  async arquivoCreate(dto: Pick<LadesaTypings.Arquivo, "name" | "mimeType">, data: NodeJS.ArrayBufferView | Readable): Promise<Pick<ArquivoEntity, "id">> {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

    // TODO: sizeBytes
    const sizeBytes = 0;
    // TODO: mimeType
    const mimeType = dto.mimeType;

    await this.arquivoRepository.save(<ArquivoEntity>{
      id,
      //
      name: dto.name,
      mimeType: mimeType,
      sizeBytes: sizeBytes,
      storageType: "filesystem",
      //
    });

    return {
      id,
    };
  }

  private datGetFilePath(id: LadesaTypings.Arquivo["id"]) {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }
}
