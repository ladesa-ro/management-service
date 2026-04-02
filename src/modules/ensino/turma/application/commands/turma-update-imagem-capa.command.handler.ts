import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  ITurmaUpdateImagemCapaCommandHandler,
  type TurmaUpdateImagemCapaCommand,
} from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import { ITurmaRepository } from "../../domain/repositories";

@Impl()
export class TurmaUpdateImagemCapaCommandHandlerImpl
  implements ITurmaUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Dep(ITurmaPermissionChecker)
    private readonly permissionChecker: ITurmaPermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: TurmaUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const aggregate = await this.repository.loadById(accessContext, dto.id);

    ensureExists(aggregate, Turma.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: aggregate.id } },
      aggregate.id,
    );

    return saveEntityImagemField(
      aggregate.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}
