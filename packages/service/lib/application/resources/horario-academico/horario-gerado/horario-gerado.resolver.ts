import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { HorarioGeradoService } from "./horario-gerado.service";

@Resolver()
export class HorarioGeradoResolver {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  //

  async horarioGeradoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("HorarioGeradoFindAll") dto: IAppRequest<"HorarioGeradoFindAll">,
  ) {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }

  //

  async horarioGeradoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("HorarioGeradoFindOneById") dto: IAppRequest<"HorarioGeradoFindOneById">,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async horarioGeradoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("HorarioGeradoCreate") dto: IAppRequest<"HorarioGeradoCreate">,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  //

  async horarioGeradoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("HorarioGeradoUpdate") dto: IAppRequest<"HorarioGeradoUpdate">,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }

  //

  async horarioGeradoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("HorarioGeradoDeleteOneById") dto: IAppRequest<"HorarioGeradoDeleteOneById">,
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
