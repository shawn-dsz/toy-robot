/*globals beforeEach*/
import Table from '../src/Table'
import parse from '../src/util/Parse'
import Robot from '../src/Robot'
import { expect } from 'chai'

describe('Given a robot', () => {
  let table
  let robot

  beforeEach(() => {
      table = new Table(5)
      robot = new Robot(table)
  })

  it('is placed in a valid position', () => {
    robot.instruct(parse('PLACE 1, 2, EAST'))
    expect(robot.report()).to.equal('Output: 1, 2, EAST')
  })

  describe('is placed in valid locations', () => {
    beforeEach(() => {
      console.log('table', table.size)
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
    beforeEach(() => {
      table = new Table(3)
      robot = new Robot(table)
    })

    it('it should NOT be able to move to the east', () => {
      const instruction = parse('PLACE 2, 0, EAST')
      robot.instruct(instruction)
      robot.move()
      expect(robot.report()).to.equal('Output: 2, 0, EAST')
    })

    it('it should NOT be able to move to the north', () => {
      const instruction = parse('PLACE 0, 2, EAST')
      robot.instruct(instruction)
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 2, NORTH')
    })

    it('it should NOT be able to move to the west', () => {
      const instruction = parse('PLACE 0, 0, EAST')
      robot.instruct(instruction)
      robot.turnLeft()
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, WEST')
    })

    it('it should NOT be able to move to the south', () => {
      const instruction = parse('PLACE 0, 0, EAST')
      robot.instruct(instruction)
      robot.turnLeft()
      robot.turnLeft()
      robot.turnLeft()
      robot.move()
      expect(robot.report()).to.equal('Output: 0, 0, SOUTH')
    })
  })

  describe('PLACE should be the first command', () => {
    beforeEach(() => {
      table = new Table(2)
      robot = new Robot(table)
    })

    it('should bot be able to report without first being placed', () => {
      const instruction = parse('REPORT')
      expect(()=>robot.instruct(instruction)).to.throw(Error)
    })


    it('should bot be able to MOVE without first being placed', () => {
      const instruction = parse('MOVE')
      expect(()=>robot.instruct(instruction)).to.throw(Error)
    })

    it('should give error when invalid command', () => {
      expect(()=>parse('MOVsE')).to.throw(Error)
    })
  })
})
