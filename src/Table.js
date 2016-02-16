export default class Table {
  /*
   *
   * @param  {[type]} size - 5 creates a board 0 -> 4
   */
  constructor(size) {
    this.size = size || 5
  }

  isValidPlacement(x, y) {
    console.log(x, y)
    return x < this.size && y < this.size && x >= 0 && y >= 0
  }

  isOnTable(pos) {
    return pos < this.size && pos >= 0
  }

}
