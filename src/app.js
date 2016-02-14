import parse from './parse'
import Table from './Table'
import Robot from './Robot'

/*
  using vanila javascript to interact with the DOM
 */
var input = document.getElementById('instruction-input')

//
const display = (text) => {
  document.getElementById('status').innerHTML = text
}

const table = new Table()
let robot = new Robot(table)


document.getElementById('command-btn').onclick = () => {


  var instruction = parse(input.value)
  console.log(instruction, input.value)
  robot.instruct(instruction)
  display(robot.report())

  input.value = 'MOVE'
}



document.getElementById('reset-btn').onclick = () => {
  robot = new Robot(table)
}
