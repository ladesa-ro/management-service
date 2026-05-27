import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type EmpresaUpdateFotoEmpresaCommand,
  IEmpresaUpdateFotoEmpresaCommandHandler,
} from "@/modules/estagio/empresa/domain/commands/empresa-update-foto-empresa.command.handler.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaUpdateFotoEmpresaCommandHandlerImpl
  implements IEmpresaUpdateFotoEmpresaCommandHandler
{
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: EmpresaUpdateFotoEmpresaCommand,
  ): Promise<boolean> {
    const current = await this.repository.loadById(accessContext, dto.id);
    ensureExists(current, Empresa.entityName, dto.id);

    return saveEntityImagemField(
      current.id,
      file,
      "fotoEmpresa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}
