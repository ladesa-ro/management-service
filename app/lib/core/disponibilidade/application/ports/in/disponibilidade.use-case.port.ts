import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import {
  DisponibilidadeCreateInput,
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  DisponibilidadeUpdateInput,
} from "../../dtos";

export interface IDisponibilidadeUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInput | null,
  ): Promise<DisponibilidadeListOutput>;
  findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInput,
  ): Promise<DisponibilidadeFindOneOutput | null>;
  findByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput,
  ): Promise<DisponibilidadeFindOneOutput>;
  create(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInput,
  ): Promise<DisponibilidadeFindOneOutput>;
  update(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput & DisponibilidadeUpdateInput,
  ): Promise<DisponibilidadeFindOneOutput>;
  deleteOneById(accessContext: AccessContext, dto: DisponibilidadeFindOneInput): Promise<boolean>;
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<DisponibilidadeFindOneOutput>;
}
