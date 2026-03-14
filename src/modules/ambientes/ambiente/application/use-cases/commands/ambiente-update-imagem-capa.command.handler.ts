import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
  saveEntityImagemField,
} from "@/modules/@shared";
import {
  type IAmbienteUpdateImagemCapaCommand,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
} from "../../../domain/repositories";

@Injectable()
export class AmbienteUpdateImagemCapaCommandHandlerImpl
  implements IAmbienteUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IAmbienteUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    if (!current) {
      throw new ResourceNotFoundError("Ambiente", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "ambiente:update",
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
