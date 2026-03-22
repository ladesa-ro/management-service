import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { graphqlExtractSelection } from "@/infrastructure.graphql";
import { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import {
  IImagemArquivoFindOneQueryHandler,
  ImagemArquivoFindOneQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import {
  IImagemArquivoListQueryHandler,
  ImagemArquivoListQueryMetadata,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import { AccessContextGraphQL } from "@/server/access-context";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";
import { ImagemArquivoGraphqlMapper } from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputGraphQlDto)
export class ImagemArquivoGraphqlResolver {
  constructor(
    @DeclareDependency(IImagemArquivoListQueryHandler)
    private readonly listHandler: IImagemArquivoListQueryHandler,
    @DeclareDependency(IImagemArquivoFindOneQueryHandler)
    private readonly findOneHandler: IImagemArquivoFindOneQueryHandler,
  ) {}

  @Query(() => ImagemArquivoListOutputGraphQlDto, ImagemArquivoListQueryMetadata.gqlMetadata)
  async findAll(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args() dto: ImagemArquivoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoListOutputGraphQlDto> {
    const input = ImagemArquivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }
    const result = await this.listHandler.execute(accessContext, input);
    return ImagemArquivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, ImagemArquivoFindOneQueryMetadata.gqlMetadata)
  async findById(
    @AccessContextGraphQL() accessContext: IAccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, ImagemArquivo.entityName, id);
    return ImagemArquivoGraphqlMapper.toFindOneOutputDto(result);
  }
}
