import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IModalidadeCreateCommand,
  IModalidadeCreateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import { IModalidadeRepository } from "../../domain/repositories";
import type { ModalidadeFindOneOutputDto } from "../dtos";

@Injectable()
export class ModalidadeCreateCommandHandlerImpl implements IModalidadeCreateCommandHandler {
  constructor(
    @Inject(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Inject(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IModalidadeCreateCommand): Promise<ModalidadeFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = Modalidade.criar({ nome: dto.nome, slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Modalidade.entityName, id);

    return result;
  }
}
