import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "../../dtos";

export interface IDisponibilidadeUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null,
  ): Promise<DisponibilidadeListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;

  deleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<boolean>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<DisponibilidadeFindOneOutputDto>;
}
