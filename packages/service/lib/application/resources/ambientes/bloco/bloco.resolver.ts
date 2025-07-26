import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { BlocoService } from "./bloco.service";

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  async blocoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoFindAll") dto: IOperationInput<"BlocoFindAll">,
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  //

  async blocoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoFindOneById") dto: IOperationInput<"BlocoFindOneById">,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async blocoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoCreate") dto: IOperationInput<"BlocoCreate">,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoUpdate") dto: IOperationInput<"BlocoUpdate">,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }

  async blocoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoDeleteOneById") dto: IOperationInput<"BlocoDeleteOneById">,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
