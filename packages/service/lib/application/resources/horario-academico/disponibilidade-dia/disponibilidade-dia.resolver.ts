import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@Resolver()
export class DisponibilidadeDiaResolver {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  //

  async disponibilidadeDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DisponibilidadeDiaFindAll") dto: IOperationInput<"DisponibilidadeDiaFindAll">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(accessContext, dto);
  }

  //

  async disponibilidadeDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DisponibilidadeDiaFindOneById") dto: IOperationInput<"DisponibilidadeDiaFindOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async disponibilidadeDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DisponibilidadeDiaCreate") dto: IOperationInput<"DisponibilidadeDiaCreate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  //

  async disponibilidadeDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DisponibilidadeDiaUpdate") dto: IOperationInput<"DisponibilidadeDiaUpdate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  //

  async disponibilidadeDiaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("DisponibilidadeDiaOneById") dto: IOperationInput<"DisponibilidadeDiaOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
