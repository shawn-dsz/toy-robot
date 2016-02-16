let _size

export default class Table {

  /*
   * @param  {[type]} size - 5 creates a board 0 -> 4
   */
  constructor(size) {
    _size = size || 5
  }

  isValidPlacement(x, y) {
    return x < _size && y < _size && x >= 0 && y >= 0
  }

  isOnTable(pos) {
    return pos < _size && pos >= 0
  }

}
