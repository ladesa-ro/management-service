import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstadoFindOneQuery,
  IEstadoFindOneQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-find-one.query.handler.interface";
import { IEstadoRepository } from "../../domain/repositories";
import type { EstadoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class EstadoFindOneQueryHandlerImpl implements IEstadoFindOneQueryHandler {
  constructor(
    @DeclareDependency(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IEstadoFindOneQuery): Promise<EstadoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
