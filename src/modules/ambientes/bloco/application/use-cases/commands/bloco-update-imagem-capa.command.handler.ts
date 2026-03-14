import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
  saveEntityImagemField,
} from "@/modules/@shared";
import {
  type IBlocoUpdateImagemCapaCommand,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../../domain/repositories";

@Injectable()
export class BlocoUpdateImagemCapaCommandHandlerImpl
  implements IBlocoUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IBlocoUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    if (!current) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "bloco:update",
      { dto: { id: current.id } },
      current.id,
    );

    return saveEntityImagemField(
      current.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}
