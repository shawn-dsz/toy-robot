export default class Table {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  isValidPos(x, y, dir) {
    console.log(x, y, dir)
  }

  toString() {
    return `(${this.x},  dd ${this.y})`
  }
}
