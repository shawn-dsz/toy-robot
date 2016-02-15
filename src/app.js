import parse from './util/parse'
import Robot from './Robot'
import Table from './Table'
// import '../styles/app.scss'

/*
  using vanila javascript to interact with the DOM
 */

var input = document.getElementById('instruction-input')
const display = (text) => {
  document.getElementById('status').innerHTML = text
  document.getElementById('error').innerHTML = null
}

var table = new Table(2)
let robot = new Robot(table)

document.getElementById('instruction-input').addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    e.preventDefault()
    try {
      var instruction = parse(input.value)
      console.log(instruction, input.value)
      robot.instruct(instruction)
      display(robot.report())
    } catch (err) {
      console.error(err)
      document.getElementById('error').innerHTML = err.message
    }
  }
})
