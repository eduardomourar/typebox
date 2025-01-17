import { TypeGuard } from '@sinclair/typebox/guard'
import { Type } from '@sinclair/typebox'
import { Assert } from '../assert/index'

describe('type/guard/TVoid', () => {
  it('should guard for TVoid', () => {
    const R = TypeGuard.TVoid(Type.Void())
    Assert.equal(R, true)
  })
  it('should not guard for TVoid', () => {
    const R = TypeGuard.TVoid(null)
    Assert.equal(R, false)
  })
})
