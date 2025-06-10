import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { AulaService } from "./aula.service";

@Resolver()
export class AulaResolver {
  constructor(
    //
    private aulaService: AulaService,
  ) {}
  //
  @Operation(Tokens.AulaList)
  async aulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaListOperationInput,
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.AulaFindOneById)
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaFindOneByIdOperationOutput,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.AulaCreate)
  async aulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaCreateOperationInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }
  @Operation(Tokens.AulaUpdateOneById)
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaUpdateByIdOperationInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }
  @Operation(Tokens.AulaDeleteOneById)
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaDeleteByIdOperationInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
