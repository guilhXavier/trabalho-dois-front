export interface Pageable<T> {
  first: boolean
  last: boolean
  content: Array<T>
}

export type RequestBody = number &
  string &
  boolean &
  Record<string, number & string>
