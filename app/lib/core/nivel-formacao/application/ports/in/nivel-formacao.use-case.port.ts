import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import {
  NivelFormacaoCreateInput,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
  NivelFormacaoUpdateInput,
} from "../../dtos";

export interface INivelFormacaoUseCasePort {
  findAll(accessContext: AccessContext, dto: NivelFormacaoListInput | null): Promise<NivelFormacaoListOutput>;
  findById(accessContext: AccessContext, dto: NivelFormacaoFindOneInput): Promise<NivelFormacaoFindOneOutput | null>;
  findByIdStrict(accessContext: AccessContext, dto: NivelFormacaoFindOneInput): Promise<NivelFormacaoFindOneOutput>;
  create(accessContext: AccessContext, dto: NivelFormacaoCreateInput): Promise<NivelFormacaoFindOneOutput>;
  update(accessContext: AccessContext, dto: NivelFormacaoFindOneInput & NivelFormacaoUpdateInput): Promise<NivelFormacaoFindOneOutput>;
  deleteOneById(accessContext: AccessContext, dto: NivelFormacaoFindOneInput): Promise<boolean>;
  // Legacy method alias - accepts string id
  nivelFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: string): Promise<NivelFormacaoFindOneOutput>;
}
