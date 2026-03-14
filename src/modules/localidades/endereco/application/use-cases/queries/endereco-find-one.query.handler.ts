import { Inject, Injectable } from "@nestjs/common";
import {
  type IEnderecoFindOneQuery,
  IEnderecoFindOneQueryHandler,
} from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import {
  ENDERECO_REPOSITORY_PORT,
  type IEnderecoRepositoryPort,
} from "../../../domain/repositories";
import type { EnderecoFindOneOutputDto } from "../../dtos";

@Injectable()
export class EnderecoFindOneQueryHandlerImpl implements IEnderecoFindOneQueryHandler {
  constructor(
    @Inject(ENDERECO_REPOSITORY_PORT)
    private readonly repository: IEnderecoRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEnderecoFindOneQuery): Promise<EnderecoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
