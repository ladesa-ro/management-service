import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService, saveEntityImagemField } from "@/modules/@shared";
import {
  type IBlocoUpdateImagemCapaCommand,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IBlocoRepository } from "../../../domain/repositories";

@Injectable()
export class BlocoUpdateImagemCapaCommandHandlerImpl
  implements IBlocoUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IBlocoUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, "Bloco", dto.id);

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
