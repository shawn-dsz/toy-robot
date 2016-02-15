/*globals beforeEach*/
import Table from '../src/Table'
import parse from '../src/util/Parse'
import Robot from '../src/Robot'
import { expect } from 'chai'

describe('Given a robot', () => {
  let table
  let robot

  beforeEach(function() {
      table = new Table(5)
      robot = new Robot(table)
  })

  it('is placed in a valid position', () => {
    robot.instruct(parse('PLACE 1, 2, EAST'))
    expect(robot.report()).to.equal('Output: 1, 2, EAST')
  })

  describe('is placed', () => {
    beforeEach(function() {
      const instruction = parse('PLACE 2, 2, EAST')
      robot.instruct(instruction)
    })

    it('it should be able to move', () => {
      robot.move()
      expect(robot.report()).to.equal('Output: 3, 2, EAST')
    })

    it('it should turn left', () => {
      robot.turnLeft()
      expect(robot.report()).to.equal('Output: 2, 2, NORTH')
    })

    it('it should turn right', () => {
      robot.turnRight()
      expect(robot.report()).to.equal('Output: 2, 2, SOUTH')
    })

    it('it should turn right twice', () => {
      robot.turnRight()
      robot.turnRight()
      expect(robot.report()).to.equal('Output: 2, 2, WEST')
    })

    describe('it should pass simple test cases outlined in the brief', () => {

      it('it should move', () => {
        const instruction = parse('PLACE 0, 0, NORTH')
        robot.instruct(instruction)
        robot.move()
        expect(robot.report()).to.equal('Output: 0, 1, NORTH')
      })

      it('it should turn', () => {
        const instruction = parse('PLACE 0, 0, NORTH')
        robot.instruct(instruction)
        robot.turnLeft()
        expect(robot.report()).to.equal('Output: 0, 0, WEST')
      })

      it('it should move & turn', () => {
        const instruction = parse('PLACE 1, 2, EAST')
        robot.instruct(instruction)
        robot.move()
        robot.move()
        robot.turnLeft()
        robot.move()
        expect(robot.report()).to.equal('Output: 3, 3, NORTH')
      })
    })

  })

  describe('is on the edge', () => {
    beforeEach(function() {
      table = new Table(1)
      robot = new Robot(table)
      const instruction = parse('PLACE 0, 0, EAST')
      robot.instruct(instruction)
    })

    it('it should NOT be able to move to the east', () => {
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, EAST')
    })

    it('it should NOT be able to move to the north', () => {
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, NORTH')
    })

    it('it should NOT be able to move to the west', () => {
      robot.turnLeft()
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, WEST')
    })

    it('it should NOT be able to move to the south', () => {
      robot.turnLeft()
      robot.turnLeft()
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, SOUTH')
    })
  })

  describe('attempt to place it in an invalid position', () => {
    beforeEach(function() {
      table = new Table(2)
      robot = new Robot(table)
      //const instruction = parse('PLACE 1, 1, EAST')
      // expect(()=>{robot.instruct(instruction)}).to.throw(Error)
    })
    //
    // it('it should move & turn', () => {
    //   robot.move()
    //   robot.move()
    //   robot.turnLeft()
    //   robot.move()
    //   expect(robot.report()).to.equal('Output: 3, 3, NORTH')
    // })
    //

    // it('should bot be able to report without first being placed', () => {
    //   const instruction = parse('REPORT')
    //   expect(()=>{robot.instruct(instruction)}).to.throw(Error)
    // })
  })
})
