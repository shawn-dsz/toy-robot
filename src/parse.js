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
  let x = parseInt(args[1])
  let y = parseInt(args[2])
  let direction = args[3]

  if (command === COMMAND.PLACE) {

    if (!isInt(x)) {
      console.error('error', x)
    }

    if (!isInt(y)) {
      console.error('error', y)
    }

    if (FACING.MAP.get(direction) === undefined) {
      console.error('error', direction)
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
