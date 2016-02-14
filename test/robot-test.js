/*globals beforeEach*/
import Table from '../src/Table'
import parse from '../src/Parse'
import Robot from '../src/Robot'
import { expect } from 'chai'

describe('Given a robot', () => {
  let table = new Table(5)
  let robot = new Robot(table)

  beforeEach(function() {
      table = new Table(5)
      robot = new Robot(table)
  })

  it('Variable table size', () => {
    table = new Table(9)
    robot = new Robot(table)

    robot.instruct(parse('PLACE 1, 7, EAST'))

    expect(robot.report()).to.equal('Output: 1, 7, EAST')
  })

  it('Place valid robot', () => {
    robot.instruct(parse('PLACE 1, 2, EAST'))
    expect(robot.report()).to.equal('Output: 1, 2, EAST')
  })


  it('does not allow robot to be place in an invalid location ', () => {
    //TODO
    // const instruction = parse('PLACE 1, 9, EAST')
    // expect(robot.instruct(instruction)).to.throw('invalid placement')
    // expect(function () {throw new Error('invalid placement')}).to.throw('invalid placement')
  })

  describe('and given that the Robot is placed', () => {
    beforeEach(function() {
      const instruction = parse('PLACE 2, 2, EAST')
      robot.instruct(instruction)
    })

    it('it should be able to move', () => {
      robot.move()
      expect(robot.report()).to.equal('Output: 3, 2, EAST')
    })

    it('it should be turn left', () => {
      robot.turnLeft()
      expect(robot.report()).to.equal('Output: 2, 2, NORTH')
    })

    it('it should be turn right', () => {
      robot.turnRight()
      expect(robot.report()).to.equal('Output: 2, 2, SOUTH')
    })

    it('it should be turn right', () => {
      robot.turnRight()
      robot.turnRight()
      expect(robot.report()).to.equal('Output: 2, 2, WEST')
    })


    describe('and that the Robot is on the edge', () => {
      beforeEach(function() {
        table = new Table(2)
        robot = new Robot(table)
        const instruction = parse('PLACE 2, 2, EAST')
        robot.instruct(instruction)
      })


      it('it should NOT fall to the right', () => {
        //TODO
      })

      it('it should NOT fall to the left', () => {
        //TODO

      })

    })

  })

})
