import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import {
  IImagemArquivoFindOneQueryHandler,
  ImagemArquivoFindOneQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import {
  IImagemArquivoListQueryHandler,
  ImagemArquivoListQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/nest/access-context";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";
import * as ImagemArquivoGraphqlMapper from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputGraphQlDto)
export class ImagemArquivoGraphqlResolver {
  constructor(
    @Dep(IImagemArquivoListQueryHandler)
    private readonly listHandler: IImagemArquivoListQueryHandler,
    @Dep(IImagemArquivoFindOneQueryHandler)
    private readonly findOneHandler: IImagemArquivoFindOneQueryHandler,
  ) {}

  @Query(() => ImagemArquivoListOutputGraphQlDto, ImagemArquivoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: ImagemArquivoListInputGraphQlDto,
  ): Promise<ImagemArquivoListOutputGraphQlDto> {
    const query = ImagemArquivoGraphqlMapper.listInputDtoToListQuery(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return ImagemArquivoGraphqlMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, ImagemArquivoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const query = ImagemArquivoGraphqlMapper.findOneInputDtoToFindOneQuery.map(id);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, ImagemArquivo.entityName, query.id);
    return ImagemArquivoGraphqlMapper.findOneQueryResultToOutputDto.map(queryResult);
  }
}
