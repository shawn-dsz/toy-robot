import { FACING, COMMAND, ROTATE } from './consts/commands'
import { LeftMap, RightMap } from './util/directionResolver'

let _x = null
let _y = null
let _direction = null
let _table

const moveNorth = () => {
  if (_table.isOnTable(_y + 1)) {
    _y++
  } else {
    console.log('Invalid placement')
  }
}

const moveSouth = () => {
  if (_table.isOnTable(_y - 1)) {
    _y--
  } else {
    console.log('Invalid placement')
  }
}

const moveEast = () => {
  if (_table.isOnTable(_x + 1)) {
    _x++
  } else {
    console.log('Invalid placement')
  }
}

const moveWest = () => {
  if (_table.isOnTable(_x - 1)) {
    _x--
  } else {
    console.log('Invalid placement')
  }
}

export default class Robot {
  constructor(table) {
    if (!table) {
      throw new Error('table is required')
    } else {
      _table = table
    }
  }

  instruct(instruction) {
    const { command, direction, x, y } = instruction
    console.log(_x, _y, _direction)

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
    _direction = LeftMap.get(_direction)
    console.log('Facing:', _direction)
  }

  turnRight() {
    _direction = RightMap.get(_direction)
    console.log('Facing:', _direction)
  }

  place(x, y, direction) {
    if(FACING.MAP.get(direction)){
      _direction = direction
    } else {
      throw new Error(`Invalid direction`)
    }
    if (_table.isValidPlacement(x, y)) {
      _x = x
      _y = y
    } else {
      throw new Error(`Invalid placement: ${x}, ${y}`)
    }
  }

  report() {
    if(_x === null || _y === null || _direction === null) {
      throw new Error('Cannot Report without placing robot')
    } else {
      console.log(_x, _y, _direction)
      return `Output: ${_x}, ${_y}, ${_direction}`
    }
  }

  move() {
    if(!_direction){
      throw new Error('direction must be set.')
    }
    switch (_direction) {
      case FACING.NORTH:
        moveNorth()
        break
      case FACING.SOUTH:
        moveSouth()
        break
      case FACING.EAST:
        moveEast()
        break
      case FACING.WEST:
        moveWest()
        break
      default:
        throw new Error('Invalid direction')
    }
  }

}
