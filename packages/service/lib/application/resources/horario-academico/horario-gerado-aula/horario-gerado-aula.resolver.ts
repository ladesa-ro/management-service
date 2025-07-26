import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@Resolver()
export class HorarioGeradoAulaResolver {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  //

  async horarioGeradoAulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaFindAll") dto: IOperationInput<"HorarioGeradoAulaFindAll">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }

  //

  async horarioGeradoAulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaFindOneById") dto: IOperationInput<"HorarioGeradoAulaFindOneById">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async horarioGeradoAulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaCreate") dto: IOperationInput<"HorarioGeradoAulaCreate">,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  async horarioGeradoAulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("HorarioGeradoAulaUpdate") dto: IOperationInput<"HorarioGeradoAulaUpdate">,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  async horarioGeradoAulaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,

    @HttpOperationInput("HorarioGeradoAulaOneById") dto: IOperationInput<"HorarioGeradoAulaOneById">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}
