import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { ZodSchema, ZodTypeDef } from 'zod';

import { zodToOpenAPI } from 'nestjs-zod';

interface ExtendedSchemaObject extends SchemaObject {
  [key: `x-${string}`]: any;
}

export interface ZodDto<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
> {
  new (): TOutput;
  isZodDto: true;
  schema: ZodSchema<TOutput, TDef, TInput>;
  create: (input: unknown) => TOutput;
  _OPENAPI_METADATA_FACTORY: () => unknown;
}

export function markRequiredPropertiesAsRequired(schema: ExtendedSchemaObject) {
  if (!schema.properties) return schema;
  return {
    ...schema,
    properties: Object.keys(schema.properties).reduce<Record<string, unknown>>(
      (acc, key) => {
        const subSchema = schema.properties![key];

        if ('type' in subSchema && subSchema.type === 'object') {
          acc[key] = {
            ...subSchema,
            // selfRequired seems to be needed to tell nest/swagger that the property is required, when the property is an object.
            // I think this is an undocumented feature of nest/swagger.  I don't think it's part of the OpenAPI schema.
            // @see https://github.com/nestjs/swagger/pull/3347/files#diff-bd4375f8c339aca69690041a14da31752c1d4707eba6eb1129e5922454d3c7d4R272
            selfRequired: !!schema.required?.includes(key),
          };
        } else {
          acc[key] = {
            ...subSchema,
            // selfRequired doesn't seem to work when the property is not an
            // object, but `required` does. Using required like this is also not
            // part of the OpenAPI schema, but nest/swagger seems to support it
            required: !!schema.required?.includes(key),
          };
        }
        return acc;
      },
      {},
    ),
  };
}

export function createZodDto<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class AugmentedZodDto {
    public static isZodDto = true;
    public static schema = schema;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static _OPENAPI_METADATA_FACTORY() {
      const schemaObject = zodToOpenAPI(this.schema);
      return markRequiredPropertiesAsRequired(schemaObject).properties;
    }

    public static create(input: unknown) {
      return this.schema.parse(input);
    }
  }

  return AugmentedZodDto as unknown as ZodDto<TOutput, TDef, TInput>;
}
