import parse from './util/parse'
import Robot from './Robot'
import Table from './Table'

/*
  using vanila javascript to interact with the DOM
 */
var input = document.getElementById('instruction-input')
var table = new Table(5)
  //
const display = (text) => {
  document.getElementById('status').innerHTML = text
}

// const table = new Table()
let robot = new Robot(table)


document.getElementById('command-btn').onclick = () => {

  try{
    var instruction = parse(input.value)
    console.log(instruction, input.value)

    robot.instruct(instruction)
    display(robot.report())

    input.value = 'MOVE'
  } catch (err) {
    console.error(err)
    document.getElementById('error').innerHTML = err.message
  }
}

document.getElementById('reset-btn').onclick = () => {
  robot = new Robot(table)
}
