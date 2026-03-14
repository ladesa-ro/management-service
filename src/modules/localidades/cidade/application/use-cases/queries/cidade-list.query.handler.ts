import { Inject, Injectable } from "@nestjs/common";
import {
  type ICidadeListQuery,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import { CIDADE_REPOSITORY_PORT, type ICidadeRepositoryPort } from "../../../domain/repositories";
import type { CidadeListOutputDto } from "../../dtos";

@Injectable()
export class CidadeListQueryHandlerImpl implements ICidadeListQueryHandler {
  constructor(
    @Inject(CIDADE_REPOSITORY_PORT)
    private readonly repository: ICidadeRepositoryPort,
  ) {}

  async execute({ accessContext, dto }: ICidadeListQuery): Promise<CidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
