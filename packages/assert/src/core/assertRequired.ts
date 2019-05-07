import * as Joi from "joi";

export function assertRequired(
  value: any,
  schema: Joi.SchemaLike,
  message?: string
): void {
  Joi.assert(
    value,
    Joi.compile(schema).options({ presence: "required", convert: false }),
    message
  );
}
