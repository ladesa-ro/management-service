import { Mixin } from "ts-mixer";
import { Field, ID, Int, ObjectType } from "@/modules/@shared/presentation/graphql";
/**
 * Base GraphQL DTO for entities identified by UUID.
 */
@ObjectType({ isAbstract: true })
export class EntityIdUuidGraphQlDto {
  @Field(() => ID)
  id: string;
}

/**
 * Base GraphQL DTO for entities identified by integer ID.
 */
@ObjectType({ isAbstract: true })
export class EntityIdIntGraphQlDto {
  @Field(() => Int)
  id: number;
}

/**
 * Base GraphQL DTO for entities with timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityDatedGraphQlDto {
  @Field(() => Date)
  dateCreated: Date;

  @Field(() => Date)
  dateUpdated: Date;

  @Field(() => Date, { nullable: true })
  dateDeleted: Date | null;
}

/**
 * Combined base GraphQL DTO with UUID and timestamps.
 */
@ObjectType({ isAbstract: true })
export class EntityBaseGraphQlDto extends Mixin(EntityIdUuidGraphQlDto, EntityDatedGraphQlDto) {}
