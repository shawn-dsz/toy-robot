/*globals beforeEach*/
import Table from '../src/Table'
import parse from '../src/util/Parse'
import Robot from '../src/Robot'
import { expect } from 'chai'

describe('Given a Table', () => {
  let table
  let robot

  beforeEach(function() {
      table = new Table(2)
      robot = new Robot(table)
  })

  it('it should not be place outside vertical size', () => {
      const instruction = parse('PLACE 1, 2, WEST')
      expect(()=>{robot.instruct(instruction)}).to.throw(Error)
  })

  it('it should not be place outside horizontal size', () => {
      const instruction = parse('PLACE 2, 1, WEST')
      expect(()=>{robot.instruct(instruction)}).to.throw(Error)
  })

  it('it should not be placed in a negative x postion', () => {
      const instruction = parse('PLACE -1, 1, WEST')
      expect(()=> {robot.instruct(instruction)}).to.throw(Error)
  })

  it('it should not be placed in a negative y postion', () => {
      const instruction = parse('PLACE 1, -1, WEST')
      expect(()=> {robot.instruct(instruction)}).to.throw(Error)
  })

  describe('Given a Table', () => {

    beforeEach(function() {
        table = new Table(9)
        robot = new Robot(table)
    })

    it('should be a to have variable size', () => {
      robot.instruct(parse('PLACE 1, 7, EAST'))
      expect(robot.report()).to.equal('Output: 1, 7, EAST')
    })
  })
})
