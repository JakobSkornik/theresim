export type P5ElementParams = {
  x: number
  y: number
}

export default class P5Element {
  x: number
  y: number

  constructor(params: P5ElementParams) {
    this.x = params.x
    this.y = params.y
  }
}
