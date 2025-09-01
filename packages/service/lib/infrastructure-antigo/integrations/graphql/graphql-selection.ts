import { GraphQLResolveInfo } from "graphql";
import getFieldNames from "graphql-list-fields";

export const graphqlExtractSelection = (info: GraphQLResolveInfo, transform?: "none" | "paginated") => {
  const originalSelection = getFieldNames(<any>info);

  switch (transform) {
    case "paginated": {
      return originalSelection.filter((i) => i.startsWith("data.")).map((i) => i.slice(i.indexOf(".") + 1));
    }

    default:
    case "none": {
      return originalSelection;
    }
  }
};
