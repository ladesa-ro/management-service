import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteUpdateImagemCapaCommand,
  IAmbienteUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteUpdateImagemCapaCommandHandlerImpl
  implements IAmbienteUpdateImagemCapaCommandHandler
{
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @DeclareDependency(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
    @DeclareDependency(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IAmbienteUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Ambiente.entityName, dto.id);

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
