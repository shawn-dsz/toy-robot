import { FACING } from '../consts/commands'

export const LeftMap = new Map()

LeftMap.set(FACING.NORTH, FACING.WEST)
LeftMap.set(FACING.WEST, FACING.SOUTH)
LeftMap.set(FACING.SOUTH, FACING.EAST)
LeftMap.set(FACING.EAST, FACING.NORTH)

export const RightMap = new Map()

RightMap.set(FACING.NORTH, FACING.EAST)
RightMap.set(FACING.EAST, FACING.SOUTH)
RightMap.set(FACING.SOUTH, FACING.WEST)
RightMap.set(FACING.WEST, FACING.NORTH)
