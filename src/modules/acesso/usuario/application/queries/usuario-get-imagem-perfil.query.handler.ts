import { type StreamableFile } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import { getEntityImagemStreamableFile } from "@/application/helpers";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioGetImagemPerfilQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-perfil.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import type { AccessContext } from "@/server/access-context";
import type { UsuarioFindOneQuery } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioGetImagemPerfilQueryHandlerImpl implements IUsuarioGetImagemPerfilQueryHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    { id }: UsuarioFindOneQuery,
  ): Promise<StreamableFile> {
    const usuario = await this.repository.findById(accessContext, { id });

    ensureExists(usuario, Usuario.entityName, id);

    return getEntityImagemStreamableFile(
      usuario,
      "imagemPerfil",
      "Imagem de perfil do Usuario",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}
