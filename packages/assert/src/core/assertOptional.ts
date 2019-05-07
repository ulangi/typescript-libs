import * as Joi from "joi";

export function assertOptional(
  value: any,
  schema: Joi.SchemaLike,
  message?: string
): void {
  Joi.assert(
    value,
    Joi.compile(schema).options({ presence: "optional", convert: false }),
    message
  );
}
