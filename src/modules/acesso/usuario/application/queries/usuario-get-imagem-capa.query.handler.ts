import { ensureExists } from "@/application/errors";
import { getEntityImagemStreamableFile } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioGetImagemCapaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import type { UsuarioFindOneQuery } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioGetImagemCapaQueryHandlerImpl implements IUsuarioGetImagemCapaQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: UsuarioFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const usuario = await this.repository.findById(accessContext, { id });

    ensureExists(usuario, Usuario.entityName, id);

    return getEntityImagemStreamableFile(
      usuario,
      "imagemCapa",
      "Imagem de capa do Usuario",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}
