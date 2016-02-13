// import {goo}from '../src/app'
import {expect} from 'chai'
import {init} from '../src/parse'
import Simulator from '../src/Simulator'


describe('test11', () => {
  it('robot', () => {
    // expect(goo).to.equal('Good point: (1,  dd 33)')
    //
    let sim = new Simulator(init)

    var answer = sim.report()

    expect(answer).to.equal('Output: 0,1,NORTH')
  })

})
