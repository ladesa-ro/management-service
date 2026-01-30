import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { BlocoService } from "@/core/bloco/application/use-cases/bloco.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "./bloco.rest.dto";
import { BlocoRestMapper } from "./bloco.rest.mapper";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoRestController {
  constructor(private blocoService: BlocoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista blocos" })
  @ApiOkResponse({ type: BlocoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputDto,
  ): Promise<BlocoListOutputDto> {
    const input = BlocoRestMapper.toListInput(dto);
    const result = await this.blocoService.findAll(accessContext, input);
    return BlocoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um bloco por ID" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toFindOneInput(params);
    const result = await this.blocoService.findByIdStrict(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um bloco" })
  @ApiCreatedResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toCreateInput(dto);
    const result = await this.blocoService.create(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um bloco" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
    @Body() dto: BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const input = BlocoRestMapper.toUpdateInput(params, dto);
    const result = await this.blocoService.update(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Obtem a imagem de capa de um bloco" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ) {
    return this.blocoService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define a imagem de capa de um bloco" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blocoService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um bloco" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<boolean> {
    const input = BlocoRestMapper.toFindOneInput(params);
    return this.blocoService.deleteOneById(accessContext, input);
  }
}
