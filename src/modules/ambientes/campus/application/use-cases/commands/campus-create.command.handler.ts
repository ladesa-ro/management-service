import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import {
  type ICampusCreateCommand,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { ICampusRepository } from "../../../domain/repositories";
import type { CampusFindOneOutputDto } from "../../dtos";

@Injectable()
export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
  constructor(
    @Inject(ICampusRepository)
    private readonly repository: ICampusRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute({ accessContext, dto }: ICampusCreateCommand): Promise<CampusFindOneOutputDto> {
    await this.authorizationService.ensurePermission("campus:create", { dto });

    const endereco = await this.enderecoCreateOrUpdateHandler.execute({
      id: null,
      dto: dto.endereco,
    });
    const domain = Campus.criar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
      endereco: dto.endereco,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      endereco: { id: endereco.id as string },
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, "Campus", id);

    return result;
  }
}
