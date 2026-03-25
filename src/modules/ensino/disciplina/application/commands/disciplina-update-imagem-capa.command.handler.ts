import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type DisciplinaUpdateImagemCapaCommand,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
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

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: DisciplinaUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Disciplina.entityName, dto.id);
    ensureActiveEntity(domain, Disciplina.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: domain.id } },
      domain.id,
    );

    const { imagem } = await this.saveImagemCapaHandler.execute(null, { file });

    domain.update({ imagemCapa: { id: imagem.id } });
    await this.repository.save(domain);

    return true;
  }
}
