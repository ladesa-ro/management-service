import { TSchema } from "@sinclair/typebox";
import { getAllowedSelection } from "@/shared-novo/resource/queries/application/helpers/get-allowed-selection";
import { getSelectionFromTypeboxSchemaObject } from "@/shared-novo/resource/queries/application/helpers/get-selection-from-typebox-schema-object";

export const getAllowedSelectionFromSchema = (schema: TSchema, requestedSelection: string[] | null = null) => {
  return getAllowedSelection(getSelectionFromTypeboxSchemaObject(schema), requestedSelection);
};
