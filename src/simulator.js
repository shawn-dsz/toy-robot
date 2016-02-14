// import {getInitCommand} from './parser'
import FACING from './commands'

import Table from './Table'

export default class Simulator {
  constructor(init) {
    console.log('Simulator', init)
      // validat command is place
      // validate place

    // let commands = getInitCommand(init)
    //validate commands
    //
    //if valid


    let table = new Table()
    var position = {
      x: 1,
      y: 2,
      face: FACING.EAST
    }
    var robot = new Robot(table, position)

  }

  placeRobot() {

  }
  report() {
    return 'Output: 0,1,NORTH'
  }
}
