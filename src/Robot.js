import {
  FACING,
  COMMAND,
  ROTATE
}
from './commands'
import {
  LeftMap,
  RightMap
}
from './directionMapper'

export default class Robot {
  constructor(table) {
    if (!table) {
      throw new Error('table is required')
    } else {
      this.table = table
    }
  }

  instruct(instruction) {

    const {
      command, direction, x, y
    } = instruction

    switch (command) {
      case COMMAND.REPORT:
        this.report()
        break
      case COMMAND.MOVE:
        this.move()
        break
      case ROTATE.LEFT:
        this.turnLeft()
        break
      case ROTATE.RIGHT:
        this.rotateRight()
        break
      case COMMAND.PLACE:
        this.place(x, y, direction)
        break
      default:
        throw new Error('command not found', command)
    }
  }

  turnLeft() {
    this.direction = LeftMap.get(this.direction)
    console.log('facing', this.direction)
  }

  turnRight() {
    this.direction = RightMap.get(this.direction)
    console.log('facing', this.direction)
  }

  place(x, y, direction) {
    // direction is always valid
    this.direction = direction
    if (this.table.isValidPlacement(x, y)) {
      this.x = x
      this.y = y
    } else {
      throw new Error('invalid placement')
    }
  }

  report() {
    console.log(this.x, this.y, this.direction)
    return `Output: ${this.x}, ${this.y}, ${this.direction}`
  }

  move() {
    switch (this.direction) {
      case FACING.NORTH:
        this.moveNorth()
        break
      case FACING.SOUTH:
        this.moveSouth()
        break
      case FACING.EAST:
        this.moveEast()
        break
      case FACING.WEST:
        this.moveWest()
        break
    }
  }

  moveNorth() {
    if (this.table.isOnTable(this.y + 1)) {
      this.y++
    } else {
      throw new Error('invalid placement')
    }
  }

  moveSouth() {
    if (this.table.isOnTable(this.y - 1)) {
      this.y--
    } else {
      throw new Error('invalid placement')
    }
  }

  moveEast() {
    if (this.table.isOnTable(this.x + 1)) {
      this.x++
    } else {
      throw new Error('invalid placement')
    }
  }

  moveWest() {
    if (this.table.isOnTable(this.x + 1)) {
      this.x--
    } else {
      throw new Error('invalid placement')
    }
  }

}
