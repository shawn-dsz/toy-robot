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
  constructor(x, y, direction) {
    this.x = x
    this.y = y
    this.direction = direction
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
    this.x = x
    this.y = y
    this.direction = direction
  }

  report() {
    console.log(this.x, this.y, this.direction)
    return `Output: ${this.x}, ${this.y}, ${this.direction}`
  }

  move() {
    switch (this.direction) {
      case FACING.NORTH:
        this.y++
          break
      case FACING.SOUTH:
        this.y--
          break
      case FACING.EAST:
        this.x++
          break
      case FACING.WEST:
        this.x--
          break
    }
  }
}
