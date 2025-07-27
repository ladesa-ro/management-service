import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiaCalendarioService } from "./dia-calendario.service";

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  //

  async diaCalendarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DiaCalendarioFindAll") dto: IAppRequest<"DiaCalendarioFindAll">,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }

  //

  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DiaCalendarioFindOneById") dto: IAppRequest<"DiaCalendarioFindOneById">,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DiaCalendarioCreate") dto: IAppRequest<"DiaCalendarioCreate">,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DiaCalendarioUpdate") dto: IAppRequest<"DiaCalendarioUpdate">,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  async diaCalendarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("DiaCalendarioDeleteOneById") dto: IAppRequest<"DiaCalendarioDeleteOneById">,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
