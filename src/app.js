import {init} from './Parse.js'
import Table from './Table.js'
import Simulator from './Simulator.js'
export const goo = 'Good poinst: ' + new Table(1, 33)

console.log(goo)
console.log(init)

let sim = new Simulator('foo')

sim.report()
