import * as LadesaTypings from "@ladesa-ro/especificacao";
import { PaginateQuery } from "nestjs-paginate";
import * as valibot from "valibot";

export type GenericListInputView = {
  queries: LadesaTypings.GenericSearchInputView;
};

const undefinedOrType = (schema: valibot.BaseSchema<any, any, valibot.BaseIssue<any>>) =>
  valibot.pipe(
    valibot.union([schema, valibot.null(), valibot.undefined()]),
    valibot.transform((value) => value ?? undefined),
    valibot.optional(schema),
  );

const paginateQueryValidation = valibot.pipe(
  valibot.record(valibot.string(), valibot.unknown()),

  valibot.transform((input) => {
    if (input) {
      const allEntries = Object.entries(input);

      const otherEntries = allEntries.filter((entry) => !entry[0].startsWith("filter."));

      const filterEntries = allEntries.filter((entry) => entry[0].startsWith("filter."));

      return {
        ...Object.fromEntries(otherEntries),

        filter: {
          ...filterEntries.reduce((acc, [key, value]) => {
            const propertyPath = key.replace("filter.", "");

            return {
              ...acc,
              [propertyPath]: Array.isArray(value) ? value : [value],
            };
          }, {}),
        },
      };
    }

    return input;
  }),

  valibot.object({
    page: undefinedOrType(valibot.number()),
    limit: undefinedOrType(valibot.number()),

    sortBy: valibot.optional(valibot.array(valibot.tuple([valibot.string(), valibot.string()]))),

    searchBy: valibot.optional(valibot.array(valibot.string())),

    search: undefinedOrType(valibot.string()),

    filter: valibot.record(valibot.string(), valibot.array(valibot.string())),

    select: valibot.optional(valibot.array(valibot.string())),

    path: valibot.optional(valibot.string()),
  }),
);

export class PaginateQueryAdapter {
  static FromGenericListInputView(path: string, genericListInputView: GenericListInputView | null): PaginateQuery {
    const inputQueries = genericListInputView?.queries;

    const parseResult = valibot.parse(paginateQueryValidation, inputQueries);

    const parsedQueries = parseResult;

    const paginateQuery: PaginateQuery = {
      path,
      ...parsedQueries,
    };

    return paginateQuery;
  }
}
