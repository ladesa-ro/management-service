import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type IDisciplinaUpdateImagemCapaCommand,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaPermissionChecker } from "../../domain/authorization";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaUpdateImagemCapaCommandHandlerImpl
  implements IDisciplinaUpdateImagemCapaCommandHandler
{
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @DeclareDependency(IDisciplinaPermissionChecker)
    private readonly permissionChecker: IDisciplinaPermissionChecker,
    @DeclareDependency(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({
    accessContext,
    dto,
    file,
  }: IDisciplinaUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Disciplina.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
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
