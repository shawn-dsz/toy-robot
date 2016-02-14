import {
  FACING,
  COMMAND
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
      console.error('table is required')
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
      case COMMAND.LEFT:
        this.rotateLeft()
        break
      case COMMAND.RIGHT:
        this.rotateRight()
        break
      case COMMAND.PLACE:
        this.place(x, y, direction)
        break
      default:
        throw new Error('command not found', command)
    }
  }

  rotateLeft() {
    this.direction = LeftMap.get(this.direction)
    console.log('facing', this.direction)
  }

  rotateRight() {
    this.direction = RightMap.get(this.direction)
    console.log('facing', this.direction)
  }

  place(x, y, direction) {
    if (this.table.isValidPlacement(x, y)) {
      this.x = x
      this.y = y
    } else {
      console.error('invalid placement')
    }
    // direction is always valid
    this.direction = direction
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
    if (this.table.isValidHorziontalMove(this.x + 1)) {
      this.x++
    } else {
      console.error('invalid placement; would result in robot\' destruction')
    }
  }

  moveSouth() {
    if (this.table.isValidHorziontalMove(this.x - 1)) {
      this.x--
    } else {
      console.error('invalid placement; would result in robot\' destruction')
    }
  }

  moveEast() {
    if (this.table.isValidVerticalMove(this.y + 1)) {
      this.y++
    } else {
      console.error('invalid placement; would result in robot\' destruction')
    }
  }

  moveWest() {
    if (this.table.isValidVerticalMove(this.y + 1)) {
      this.y--
    } else {
      console.error('invalid placement; would result in robot\' destruction')
    }
  }

}
