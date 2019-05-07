export type Diff<
  T extends string | number | symbol,
  U extends string | number | symbol
> = ({ [P in T]: P } &
  { [P in U]: never } &
  { [x in string | number | symbol]: never })[T];
