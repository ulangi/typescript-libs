import { Diff } from "./Diff";

export type OverwritePartial<T, U> = {
  readonly [P in Diff<keyof T, keyof U>]?: T[P]
} &
  U;
