export default class Table {

  constructor(size) {
    this.size = size || 5
  }

  isValidPlacement(x, y) {
    return x <= this.size && y <= this.size
  }

  isOnTable(pos) {
    return pos <= this.size
  }

}
