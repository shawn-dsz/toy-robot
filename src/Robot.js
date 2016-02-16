import { FACING, COMMAND, ROTATE } from './consts/commands'
import { LeftMap, RightMap } from './util/directionResolver'

export default class Robot {
  constructor(table) {
    if (!table) {
      throw new Error('table is required')
    } else {
      this.table = table
    }
  }

  instruct(instruction) {
    const { command, direction, x, y } = instruction

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
        this.turnRight()
        break
      case COMMAND.PLACE:
        this.place(x, y, direction)
        break
      default:
        throw new Error(`Invalid command`)
    }
  }

  turnLeft() {
    this.direction = LeftMap.get(this.direction)
    console.log('Facing:', this.direction)
  }

  turnRight() {
    this.direction = RightMap.get(this.direction)
    console.log('Facing:', this.direction)
  }

  place(x, y, direction) {
    if(FACING.MAP.get(direction)){
      this.direction = direction
    } else {
      throw new Error(`Invalid direction`)
    }
    if (this.table.isValidPlacement(x, y)) {
      this.x = x
      this.y = y
    } else {
      throw new Error(`Invalid placement: ${x}, ${y}`)
    }
  }

  report() {
    if(this.x === undefined || this.y === undefined || this.direction === undefined) {
      throw new Error('Cannot Report without placing robot')
    } else {
      console.log(this.x, this.y, this.direction)
      return `Output: ${this.x}, ${this.y}, ${this.direction}`
    }
  }

  move() {
    if(!this.direction){
      throw new Error('direction must be set.')
    }
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
      default:
        throw new Error('Invalid direction')
    }
  }

  moveNorth() {
    if (this.table.isOnTable(this.y + 1)) {
      this.y++
    } else {
      console.log('Invalid placement')
    }
  }

  moveSouth() {
    if (this.table.isOnTable(this.y - 1)) {
      this.y--
    } else {
      console.log('Invalid placement')
    }
  }

  moveEast() {
    if (this.table.isOnTable(this.x + 1)) {
      this.x++
    } else {
      console.log('Invalid placement')
    }
  }

  moveWest() {
    if (this.table.isOnTable(this.x - 1)) {
      this.x--
    } else {
      console.log('Invalid placement')
    }
  }

}
