import FACING from './consts/commands'

import Table from './Table'
import Robot from './Robot'

export default class Simulator {
  constructor(init) {


    let table = new Table()
    var position = {
      x: 1,
      y: 2,
      face: FACING.EAST
    }
    var robot = new Robot(table, position)

  }
}
