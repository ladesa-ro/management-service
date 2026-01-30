import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import {
  OfertaFormacaoCreateInput,
  OfertaFormacaoFindOneInput,
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoListInput,
  OfertaFormacaoListOutput,
  OfertaFormacaoUpdateInput,
} from "../../dtos";

export interface IOfertaFormacaoUseCasePort {
  findAll(accessContext: AccessContext, dto: OfertaFormacaoListInput | null): Promise<OfertaFormacaoListOutput>;
  findById(accessContext: AccessContext, dto: OfertaFormacaoFindOneInput): Promise<OfertaFormacaoFindOneOutput | null>;
  findByIdStrict(accessContext: AccessContext, dto: OfertaFormacaoFindOneInput): Promise<OfertaFormacaoFindOneOutput>;
  create(accessContext: AccessContext, dto: OfertaFormacaoCreateInput): Promise<OfertaFormacaoFindOneOutput>;
  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInput & OfertaFormacaoUpdateInput,
  ): Promise<OfertaFormacaoFindOneOutput>;
  deleteOneById(accessContext: AccessContext, dto: OfertaFormacaoFindOneInput): Promise<boolean>;
  // Legacy method alias - accepts string id
  ofertaFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: string): Promise<OfertaFormacaoFindOneOutput>;
}
