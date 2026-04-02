import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import {
  type AmbienteUpdateImagemCapaCommand,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import { IAmbienteRepository } from "../../domain/repositories";

@Impl()
export class AmbienteUpdateImagemCapaCommandHandlerImpl
  implements IAmbienteUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Dep(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: AmbienteUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Ambiente.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: domain.id } },
      domain.id,
    );

    const { imagem } = await this.saveImagemCapaHandler.execute(null, { file });
    domain.imagemCapa = { id: imagem.id };

    await this.repository.save(domain);

    return true;
  }
}
