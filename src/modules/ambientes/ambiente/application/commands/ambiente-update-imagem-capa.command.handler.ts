import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService, saveEntityImagemField } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteUpdateImagemCapaCommand,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IAmbienteRepository } from "../../domain/repositories";

@Injectable()
export class AmbienteUpdateImagemCapaCommandHandlerImpl
  implements IAmbienteUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IAmbienteUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Ambiente.entityName, dto.id);

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
