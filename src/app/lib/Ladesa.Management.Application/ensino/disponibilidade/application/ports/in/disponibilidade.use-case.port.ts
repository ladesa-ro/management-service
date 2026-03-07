import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { DisponibilidadeCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeCreateInputDto";
import { DisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneInputDto";
import { DisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneOutputDto";
import { DisponibilidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeListInputDto";
import { DisponibilidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeListOutputDto";
import { DisponibilidadeUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeUpdateInputDto";

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
