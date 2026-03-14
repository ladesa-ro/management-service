import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import {
  type IUsuarioGetImagemCapaQuery,
  IUsuarioGetImagemCapaQueryHandler,
} from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import { type IUsuarioRepositoryPort, USUARIO_REPOSITORY_PORT } from "../../../domain/repositories";

@Injectable()
export class UsuarioGetImagemCapaQueryHandlerImpl implements IUsuarioGetImagemCapaQueryHandler {
  constructor(
    @Inject(USUARIO_REPOSITORY_PORT)
    private readonly repository: IUsuarioRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IUsuarioGetImagemCapaQuery): Promise<StreamableFile> {
    const usuario = await this.repository.findById(accessContext, { id });

    if (!usuario) {
      throw new ResourceNotFoundError("Usuario", id);
    }

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
