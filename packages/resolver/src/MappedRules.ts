import * as Joi from "joi";

export type MappedRules<T> = {
  [K in keyof T]-?: T[K] extends any[]
    ? Joi.ArraySchema
    : T[K] extends ReadonlyArray<any>
    ? Joi.ArraySchema
    : T[K] extends Date
    ? Joi.DateSchema
    : T[K] extends object
    ? MappedRules<T[K]> | Joi.ObjectSchema
    : T[K] extends string
    ? Joi.StringSchema
    : T[K] extends number
    ? Joi.NumberSchema
    : any
};
