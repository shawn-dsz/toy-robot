import {
  COMMAND,
  FACING
}
from './commands'

const isInt = (n) => {
  return Number(n) === n && n % 1 === 0
}

/*
 * Parses the input text
 * @param {[text]} text the input string to be parsed
 * @return {[object]} position [{x, y , direction, type}]
 */
export default function Parse(text) {
  var args = text.split(/[ ,]+/)
  let command = args[0]
  let x = args[1]
  let y = args[2]
  let direction = args[3]

  if (command === COMMAND.PLACE) {

    if (!isInt(x)) {
      console.log('error', x)
    } else {
      x = parseInt(x)
    }

    if (!isInt(y)) {
      console.log('error', y)
    } else {
      y = parseInt(y)
    }

    if (FACING.MAP.get(direction) === undefined) {
      console.log('error', direction)
    }

    return {
      x,
      y,
      direction,
      command
    }
  }

  return {
    command: COMMAND.MAP.get(command)
  }

}
