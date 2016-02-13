export default class Table {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x},  dd ${this.y})`
  }
}
