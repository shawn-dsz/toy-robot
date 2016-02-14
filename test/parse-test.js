import {
  expect
}
from 'chai'


import parse
from '../src/parse'

describe('#parse', () => {
  it('parse the place command', () => {
    let pos = parse('PLACE 1, 2, EAST')

    expect(pos).to.deep.equal({
      x: 1,
      y: 2,
      direction: 'EAST',
      command: 'PLACE'
    })
  })

  // it('parse the move command', () => {
  //   let pos = parse('MOVE')
  //
  //   expect(pos).to.deep.equal({
  //     command: 'MOVE'
  //   })
  // })

})
