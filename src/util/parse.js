import { COMMAND, FACING } from '../consts/commands'

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
      throw new Error(`unable to parse "${x}"`)
    }

    if (!isInt(y)) {
      throw new Error(`unable to parse "${y}"`)
    }

    if (FACING.MAP.get(direction) === undefined) {
      throw new Error(`unable to parse "${direction}"`)
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
