import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Assert } from '../../assert'

describe('value/check/Module', () => {
  it('Should validate string', () => {
    const Module = Type.Module({
      A: Type.String(),
    })
    const T = Module.Import('A')
    Assert.IsTrue(Value.Check(T, 'hello'))
    Assert.IsFalse(Value.Check(T, true))
  })
  it('Should validate referenced string', () => {
    const Module = Type.Module({
      A: Type.String(),
      B: Type.Ref('A'),
    })
    const T = Module.Import('B')
    Assert.IsTrue(Value.Check(T, 'hello'))
    Assert.IsFalse(Value.Check(T, true))
  })
  it('Should validate self referential', () => {
    const Module = Type.Module({
      A: Type.Object({
        nodes: Type.Array(Type.Ref('A')),
      }),
    })
    const T = Module.Import('A')
    Assert.IsTrue(Value.Check(T, { nodes: [{ nodes: [{ nodes: [] }, { nodes: [] }] }] }))
    Assert.IsFalse(Value.Check(T, { nodes: [{ nodes: [{ nodes: [] }, { nodes: false }] }] }))
    Assert.IsFalse(Value.Check(T, true))
  })
  it('Should validate mutual recursive', () => {
    const Module = Type.Module({
      A: Type.Object({
        b: Type.Ref('B'),
      }),
      B: Type.Object({
        a: Type.Union([Type.Ref('A'), Type.Null()]),
      }),
    })
    const T = Module.Import('A')
    Assert.IsTrue(Value.Check(T, { b: { a: null } }))
    Assert.IsTrue(Value.Check(T, { b: { a: { b: { a: null } } } }))

    Assert.IsFalse(Value.Check(T, { b: { a: 1 } }))
    Assert.IsFalse(Value.Check(T, { b: { a: { b: { a: 1 } } } }))
    Assert.IsFalse(Value.Check(T, true))
  })
  it('Should validate mutual recursive (Array)', () => {
    const Module = Type.Module({
      A: Type.Object({
        b: Type.Ref('B'),
      }),
      B: Type.Object({
        a: Type.Array(Type.Ref('A')),
      }),
    })
    const T = Module.Import('A')
    Assert.IsTrue(Value.Check(T, { b: { a: [{ b: { a: [] } }] } }))
    Assert.IsFalse(Value.Check(T, { b: { a: [{ b: { a: [null] } }] } }))
    Assert.IsFalse(Value.Check(T, true))
  })
  it('Should validate deep referential', () => {
    const Module = Type.Module({
      A: Type.Ref('B'),
      B: Type.Ref('C'),
      C: Type.Ref('D'),
      D: Type.Ref('E'),
      E: Type.Ref('F'),
      F: Type.Ref('G'),
      G: Type.Ref('H'),
      H: Type.Literal('hello'),
    })
    const T = Module.Import('A')
    Assert.IsTrue(Value.Check(T, 'hello'))
    Assert.IsFalse(Value.Check(T, 'world'))
  })
  // ----------------------------------------------------------------
  // Modifiers
  // ----------------------------------------------------------------
  it('Should validate objects with property modifiers 1', () => {
    const Module = Type.Module({
      T: Type.Object({
        x: Type.ReadonlyOptional(Type.Null()),
        y: Type.Readonly(Type.Null()),
        z: Type.Optional(Type.Null()),
        w: Type.Null(),
      }),
    })
    const T = Module.Import('T')
    Assert.IsTrue(Value.Check(T, { x: null, y: null, w: null }))
    Assert.IsTrue(Value.Check(T, { y: null, w: null }))
    Assert.IsFalse(Value.Check(T, { x: 1, y: null, w: null }))
  })
  it('Should validate objects with property modifiers 2', () => {
    const Module = Type.Module({
      T: Type.Object({
        x: Type.ReadonlyOptional(Type.Array(Type.Null())),
        y: Type.Readonly(Type.Array(Type.Null())),
        z: Type.Optional(Type.Array(Type.Null())),
        w: Type.Array(Type.Null()),
      }),
    })
    const T = Module.Import('T')
    Assert.IsTrue(Value.Check(T, { x: [null], y: [null], w: [null] }))
    Assert.IsTrue(Value.Check(T, { y: [null], w: [null] }))
    Assert.IsFalse(Value.Check(T, { x: [1], y: [null], w: [null] }))
  })
})