import { Inject, Injectable } from "@nestjs/common";
import {
  type ICidadeListQuery,
  ICidadeListQueryHandler,
} from "@/modules/localidades/cidade/domain/queries/cidade-list.query.handler.interface";
import { ICidadeRepository } from "../../domain/repositories";
import type { CidadeListOutputDto } from "../dtos";

@Injectable()
export class CidadeListQueryHandlerImpl implements ICidadeListQueryHandler {
  constructor(
    @Inject(ICidadeRepository)
    private readonly repository: ICidadeRepository,
  ) {}

  async execute({ accessContext, dto }: ICidadeListQuery): Promise<CidadeListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
