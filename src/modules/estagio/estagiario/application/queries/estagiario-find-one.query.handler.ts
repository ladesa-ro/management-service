import { Inject, Injectable } from "@nestjs/common";
import {
  type IEstagiarioFindOneQuery,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import { IEstagiarioRepository } from "../../domain/repositories";
import type { EstagiarioFindOneOutputDto } from "../dtos";

@Injectable()
export class EstagiarioFindOneQueryHandlerImpl implements IEstagiarioFindOneQueryHandler {
  constructor(
    @Inject(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEstagiarioFindOneQuery): Promise<EstagiarioFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
