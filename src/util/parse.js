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
  const args = text.split(/[ ,]+/)
  const command = args[0].toUpperCase()

  if (command === COMMAND.PLACE) {
    const x = parseInt(args[1])
    const y = parseInt(args[2])
    const direction = args[3] ? args[3].toUpperCase() : null

    if (!isInt(x)) {
      throw new Error(`Invalid {x} position`)
    }

    if (!isInt(y)) {
      throw new Error(`Invalid {x} position`)
    }

    if (FACING.MAP.get(direction) === undefined) {
      throw new Error(`Invalid direction`)
    }

    return {
      x,
      y,
      direction,
      command
    }
  }

  if(!COMMAND.MAP.get(command)){
    throw new Error(`Invalid command.`)
  }
  return {
    command: COMMAND.MAP.get(command)
  }

}
