import { type StreamableFile } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, getEntityImagemStreamableFile } from "@/modules/@shared";
import {
  type IUsuarioGetImagemCapaQuery,
  IUsuarioGetImagemCapaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
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

  async execute({ accessContext, id }: IUsuarioGetImagemCapaQuery): Promise<StreamableFile> {
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
