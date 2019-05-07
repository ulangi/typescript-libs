export type DeepMutable<T> = T extends ReadonlyArray<infer U>
  ? U[] // Cannot use recursive here due to typescript limitation
  : T extends object
  ? {
      -readonly [P in keyof T]: T[P] extends (infer V)[]
        ? DeepMutable<V>[]
        : T[P] extends ReadonlyArray<infer X>
        ? DeepMutable<X>[]
        : DeepMutable<T[P]>
    }
  : T;
