import { Inject, Injectable } from "@nestjs/common";
import {
  type IEtapaListQuery,
  IEtapaListQueryHandler,
} from "@/modules/ensino/etapa/domain/queries/etapa-list.query.handler.interface";
import type { EtapaListOutputDto } from "../../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../../ports";

@Injectable()
export class EtapaListQueryHandlerImpl implements IEtapaListQueryHandler {
  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    private readonly repository: IEtapaRepositoryPort,
  ) {}

  async execute({ accessContext, dto, selection }: IEtapaListQuery): Promise<EtapaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}
