const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-sring values', () => {
    var res = isRealString(98);
    expect(res).toBeFalsy();
  });

  it('should reject string with only sapces', () => {
    var res = isRealString('     ');
    expect(res).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('   joke   ');
    expect(res).toBeTruthy();
  });
});
