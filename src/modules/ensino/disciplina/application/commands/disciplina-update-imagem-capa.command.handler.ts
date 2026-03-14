import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService, saveEntityImagemField } from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type IDisciplinaUpdateImagemCapaCommand,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaRepository } from "../../domain/repositories";

@Injectable()
export class DisciplinaUpdateImagemCapaCommandHandlerImpl
  implements IDisciplinaUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({
    accessContext,
    dto,
    file,
  }: IDisciplinaUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Disciplina.entityName, dto.id);

    await this.authorizationService.ensurePermission(
      "disciplina:update",
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
