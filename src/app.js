import parse from './util/parse'
import {COMMAND} from './consts/commands'
import Robot from './Robot'
import Table from './Table'
import '../styles/app.scss'

const input = document.getElementById('instruction-input')
const terminal = document.getElementById('terminal')
const table = new Table(5)
terminal.value = `Table size: 5`

let robot = new Robot(table)

const display = (text) => {
  terminal.value = `${terminal.value}\n${text}`
  terminal.scrollTop = terminal.scrollHeight
}

input.addEventListener('keydown', (e) => {
  if (e.keyCode == 13 && input.value.length > 0) {
    e.preventDefault()

    if(input.value.toUpperCase() === 'CLS'){
      terminal.value = null
      robot = new Robot(table)
    } else {
      try {
        display(input.value)
        var instruction = parse(input.value)
        console.log(instruction, input.value)

        robot.instruct(instruction)
        if(instruction.command === COMMAND.REPORT){
          display(robot.report())
        }
      } catch (err) {
        display(err.message)
      }
    }
    input.value = null
  }

})
