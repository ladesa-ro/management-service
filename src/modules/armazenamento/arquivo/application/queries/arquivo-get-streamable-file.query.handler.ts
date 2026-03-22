import type { Readable } from "node:stream";
import { ForbiddenException, ServiceUnavailableException, StreamableFile } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import { IStorageService } from "@/domain/abstractions/storage";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { isValidUuid } from "@/domain/validation";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { UsuarioEntity } from "@/modules/acesso/usuario/infrastructure.database";
import { Arquivo } from "@/modules/armazenamento/arquivo/domain/arquivo";
import type {
  ArquivoGetFileQuery,
  IArquivoGetStreamableFileQueryHandler,
} from "@/modules/armazenamento/arquivo/domain/queries";
import { IArquivoRepository } from "@/modules/armazenamento/arquivo/domain/repositories";

@DeclareImplementation()
export class ArquivoGetStreamableFileQueryHandlerImpl
  implements IArquivoGetStreamableFileQueryHandler
{
  constructor(
    @DeclareDependency(IArquivoRepository)
    private arquivoRepository: IArquivoRepository,
    @DeclareDependency(IStorageService)
    private storageService: IStorageService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    input: ArquivoGetFileQuery,
  ): Promise<StreamableFile> {
    const file = await this.getFile(input);

    if (!file.stream) {
      throw new ServiceUnavailableException();
    }

    return new StreamableFile(file.stream, {
      type: file.mimeType ?? undefined,
      disposition: `attachment; filename="${encodeURIComponent(file.nome ?? file.id)}"`,
    });
  }

  private async getFile(input: ArquivoGetFileQuery): Promise<{
    id: string;
    nome: string | null;
    mimeType: string | null;
    stream: Readable | null;
  }> {
    const { id, acesso } = input;
    const qb = this.arquivoRepository.createQueryBuilder("arquivo");

    qb.where("arquivo.id = :arquivoId", { arquivoId: id });

    const exists = await qb.getExists();

    ensureExists(exists, Arquivo.entityName, id);

    if (acesso) {
      if (acesso.nome === "bloco" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.blocoCapa", "blocoCapa");

        qb.andWhere("blocoCapa.dateDeleted IS NULL");
        qb.andWhere("blocoCapa.id = :blocoId", { blocoId: acesso.id });
      } else if (acesso.nome === "ambiente" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .innerJoin("imagem.ambienteCapa", "ambienteCapa");

        qb.andWhere("ambienteCapa.dateDeleted IS NULL");
        qb.andWhere("ambienteCapa.id = :ambienteId", { ambienteId: acesso.id });
      } else if (acesso.nome === "usuario" && isValidUuid(acesso.id)) {
        qb.innerJoin("arquivo.versao", "versao")
          .innerJoin("versao.imagem", "imagem")
          .leftJoin(
            UsuarioEntity,
            "usuario",
            "(usuario.id_imagem_capa_fk = imagem.id OR usuario.id_imagem_perfil_fk = imagem.id)",
          );

        qb.andWhere("usuario.dateDeleted IS NULL");
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

    if (!(await this.storageService.exists(id))) {
      throw new ServiceUnavailableException();
    }

    const stream = await this.storageService.readAsStream(id);

    return {
      id: arquivo.id,
      nome: arquivo.name,
      mimeType: arquivo.mimeType,
      stream,
    };
  }
}
