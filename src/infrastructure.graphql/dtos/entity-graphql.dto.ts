import { Mixin } from "ts-mixer";
import { SharedFields } from "@/domain/abstractions";
import { Field, ID, Int, ObjectType } from "@/shared/presentation/graphql";
/**
 * Base GraphQL DTO for entities identified by UUID.
 */
@ObjectType({ isAbstract: true })
export class EntityIdUuidGraphQlDto {
  @Field(() => ID, SharedFields.idUuid.gqlMetadata)
  id: string;
}

/**
 * Base GraphQL DTO for entities identified by integer ID.
 */
@ObjectType({ isAbstract: true })
export class EntityIdIntGraphQlDto {
  @Field(() => Int, SharedFields.idNumeric.gqlMetadata)
  id: number;
}

/**
 * Base GraphQL DTO for entities with timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityDatedGraphQlDto {
  @Field(() => Date, SharedFields.dateCreated.gqlMetadata)
  dateCreated: Date;

  @Field(() => Date, SharedFields.dateUpdated.gqlMetadata)
  dateUpdated: Date;

  @Field(() => Date, SharedFields.dateDeleted.gqlMetadata)
  dateDeleted: Date | null;
}

/**
 * Combined base GraphQL DTO with UUID and timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityBaseGraphQlDto extends Mixin(EntityIdUuidGraphQlDto, EntityDatedGraphQlDto) {}
