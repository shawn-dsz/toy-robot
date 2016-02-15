import parse from './util/parse'
import Robot from './Robot'
import Table from './Table'
import '../styles/app.scss'

const input = document.getElementById('instruction-input')
const terminal = document.getElementById('terminal')

const table = new Table(5)
let robot = new Robot(table)

const display = (text) => {
  terminal.value = `${terminal.value}\n${text}`
  terminal.scrollTop = terminal.scrollHeight
}

input.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault()

    if(input.value === 'cls'){
      terminal.value = null
    } else {
      try {
        var instruction = parse(input.value)
        console.log(instruction, input.value)
        robot.instruct(instruction)
        display(robot.report())
      } catch (err) {
        display(err)
      }
    }
    input.value = null
  }

})
