import Table from '../src/Table'
import parse from '../src/Parse'
import Robot from '../src/Robot'
import {
  expect
}
from 'chai'

describe('Robot', () => {

  it('PLACE 1, 2, EAST', () => {

    let table = new Table(5)
    let robot = new Robot(table)
    robot.instruct(parse('PLACE 1, 2, EAST'))

    expect(robot.report()).to.equal('Output: 1, 2, EAST')
  })

})
