import { expect } from 'chai'
import sum from '@app/sum.js'

describe("Unit", () => {
  describe('sum', function () {
    it('should return sum of arguments', function () {
      expect(sum(1, 2)).to.equal(3)
    })
  })
})
