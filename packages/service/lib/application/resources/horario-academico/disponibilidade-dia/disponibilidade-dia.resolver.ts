import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@Resolver()
export class DisponibilidadeDiaResolver {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  //
  
  async disponibilidadeDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaFindAll") dto: IApiDoc.operations["DisponibilidadeDiaFindAll"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(accessContext, dto);
  }

  //
  
  async disponibilidadeDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaFindOneById") dto: IApiDoc.operations["DisponibilidadeDiaFindOneById"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //
  
  async disponibilidadeDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaCreate") dto: IApiDoc.operations["DisponibilidadeDiaCreate"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  //
  
  async disponibilidadeDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaUpdate") dto: IApiDoc.operations["DisponibilidadeDiaUpdate"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  //
  
  async disponibilidadeDiaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaOneById") dto: IApiDoc.operations["DisponibilidadeDiaOneById"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
