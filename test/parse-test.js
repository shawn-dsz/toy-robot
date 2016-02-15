import { expect } from 'chai'


import parse from '../src/util/parse'

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

  it('parse the place command', () => {
    let pos = parse('PLACE 1, 2, north')

    expect(pos).to.deep.equal({
      x: 1,
      y: 2,
      direction: 'NORTH',
      command: 'PLACE'
    })
  })

  it('parse the MOVE command', () => {
    let pos = parse('MOVE')
    expect(pos).to.deep.equal({ command: 'MOVE' })
  })

  it('parse lowercase commands eg. move', () => {
    let pos = parse('move')
    expect(pos).to.deep.equal({ command: 'MOVE' })
  })

  it('parse the RIGHT command', () => {
    let pos = parse('RIGHT')
    expect(pos).to.deep.equal({ command: 'RIGHT' })
  })

  it('parse the LEFT command', () => {
    let pos = parse('LEFT')
    expect(pos).to.deep.equal({ command: 'LEFT' })
  })

  it('parse the REPORT command', () => {
    let pos = parse('REPORT')
    expect(pos).to.deep.equal({ command: 'REPORT' })
  })



})
