import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@Resolver()
export class DisponibilidadeDiaResolver {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}
  //
  @Operation(Tokens.DisponibilidadeDiaList)
  async disponibilidadeDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaListOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.DisponibilidadeDiaFindOneById)
  async disponibilidadeDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaFindOneByIdOperationOutput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(Tokens.DisponibilidadeDiaCreate)
  async disponibilidadeDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaCreateOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }
  //
  @Operation(Tokens.DisponibilidadeDiaUpdateOneById)
  async disponibilidadeDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaUpdateByIdOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }
  //
  @Operation(Tokens.DisponibilidadeDiaDeleteOneById)
  async disponibilidadeDiaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaDeleteByIdOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
