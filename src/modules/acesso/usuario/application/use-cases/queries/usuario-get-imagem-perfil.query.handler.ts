import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { ensureExists, getEntityImagemStreamableFile } from "@/modules/@shared";
import {
  type IUsuarioGetImagemPerfilQuery,
  IUsuarioGetImagemPerfilQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-perfil.query.handler.interface";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import { IUsuarioRepository } from "../../../domain/repositories";

@Injectable()
export class UsuarioGetImagemPerfilQueryHandlerImpl implements IUsuarioGetImagemPerfilQueryHandler {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IUsuarioGetImagemPerfilQuery): Promise<StreamableFile> {
    const usuario = await this.repository.findById(accessContext, { id });

    ensureExists(usuario, "Usuario", id);

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
