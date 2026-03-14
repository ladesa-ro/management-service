import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstagiarioFindOneQuery,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioFindOneQueryHandlerImpl implements IEstagiarioFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IEstagiarioFindOneQuery): Promise<EstagiarioFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}
