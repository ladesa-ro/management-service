import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { decorate, Mixin } from "ts-mixer";

/**
 * Base GraphQL DTO for entities identified by UUID.
 */
@decorate(ObjectType({ isAbstract: true }))
export class EntityIdUuidGraphQlDto {
  @decorate(Field(() => ID))
  id: string;
}

/**
 * Base GraphQL DTO for entities identified by integer ID.
 */
@decorate(ObjectType({ isAbstract: true }))
export class EntityIdIntGraphQlDto {
  @decorate(Field(() => Int))
  id: number;
}

/**
 * Base GraphQL DTO for entities with timestamps.
 */
@decorate(ObjectType({ isAbstract: true }))
export class EntityDatedGraphQlDto {
  @decorate(Field(() => Date))
  dateCreated: Date;

  @decorate(Field(() => Date))
  dateUpdated: Date;

  @decorate(Field(() => Date, { nullable: true }))
  dateDeleted: Date | null;
}

/**
 * Combined base GraphQL DTO with UUID and timestamps.
 */
@decorate(ObjectType({ isAbstract: true }))
export class EntityBaseGraphQlDto extends Mixin(EntityIdUuidGraphQlDto, EntityDatedGraphQlDto) {}
