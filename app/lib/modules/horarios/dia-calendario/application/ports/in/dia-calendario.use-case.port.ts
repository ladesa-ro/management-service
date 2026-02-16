import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../../dtos";

export interface IDiaCalendarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto): Promise<boolean>;
}
