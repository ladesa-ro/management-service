import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService, saveEntityImagemField } from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type ITurmaUpdateImagemCapaCommand,
  ITurmaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { ITurmaRepository } from "../../domain/repositories";

@Injectable()
export class TurmaUpdateImagemCapaCommandHandlerImpl
  implements ITurmaUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: ITurmaUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Turma.entityName, dto.id);

    await this.authorizationService.ensurePermission(
      "turma:update",
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
