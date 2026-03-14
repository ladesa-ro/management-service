import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEstadoListQuery,
  IEstadoListQueryHandler,
} from "@/modules/localidades/estado/domain/queries/estado-list.query.handler.interface";
import { IEstadoRepository } from "../../domain/repositories";
import type { EstadoListOutputDto } from "../dtos";

@DeclareImplementation()
export class EstadoListQueryHandlerImpl implements IEstadoListQueryHandler {
  constructor(
    @DeclareDependency(IEstadoRepository)
    private readonly repository: IEstadoRepository,
  ) {}

  async execute({ accessContext, dto }: IEstadoListQuery): Promise<EstadoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
