export default class Table {

  constructor(size) {
    this.size = size || 5
  }

  isValidPlacement(x, y) {
    return x <= this.size && y <= this.size
  }

  isValidVerticalMove(y) {
    return y <= this.size
  }

  isValidHorziontalMove(x) {
    return x <= this.size
  }

}
