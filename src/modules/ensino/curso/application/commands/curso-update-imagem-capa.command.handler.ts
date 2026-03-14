import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService, saveEntityImagemField } from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type ICursoUpdateImagemCapaCommand,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { ICursoRepository } from "../../domain/repositories";

@Injectable()
export class CursoUpdateImagemCapaCommandHandlerImpl
  implements ICursoUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: ICursoUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Curso.entityName, dto.id);

    await this.authorizationService.ensurePermission(
      "curso:update",
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
