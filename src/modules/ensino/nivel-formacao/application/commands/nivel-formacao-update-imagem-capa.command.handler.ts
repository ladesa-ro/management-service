import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  INivelFormacaoUpdateImagemCapaCommandHandler,
  type NivelFormacaoUpdateImagemCapaCommand,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update-imagem-capa.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoUpdateImagemCapaCommandHandlerImpl
  implements INivelFormacaoUpdateImagemCapaCommandHandler
{
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @DeclareDependency(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
    @DeclareDependency(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: NivelFormacaoUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, NivelFormacao.entityName, dto.id);

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
