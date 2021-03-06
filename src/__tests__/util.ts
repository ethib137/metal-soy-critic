import * as Util from '../util';

describe('toResult', () => {
  test('should return a Result object', () => {
    const result = Util.toResult(true, 'message');

    expect(result).toEqual({
      status: true,
      messages: ['message']
    });
  });

  test('should default to empty messages', () => {
    const result = Util.toResult(false);

    expect(result).toEqual({
      status: false,
      messages: []
    });
  });
});

describe('joinErrors', () => {
  test('should return a string with all messages joined', () => {
    const errors = ['nope', 'bad', 'try again'];

    expect(Util.joinErrors(errors)).toMatchSnapshot();
  });
});

describe('combineResults', () => {
  test('should combine two results into a single result', () => {
    const result = Util.combineResults(
      {
        messages: [],
        status: true
      },
      {
        messages: [],
        status: true
      }
    );

    expect(result).toEqual({
      status: true,
      messages: []
    });
  });

  test('if one fails, they result fails', () => {
    const result = Util.combineResults(
      {
        messages: ['nope'],
        status: false
      },
      {
        messages: [],
        status: true
      }
    );

    expect(result).toEqual({
      status: false,
      messages: ['nope']
    });
  });

  test('should combine messages', () => {
    const result = Util.combineResults(
      {
        messages: ['nope'],
        status: false
      },
      {
        messages: ['nah'],
        status: false
      }
    );

    expect(result).toEqual({
      status: false,
      messages: ['nope', 'nah']
    });
  });
});

describe('difference', () => {
  test('should return the difference of two sets', () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 4]);

    expect(Util.difference(setA, setB)).toEqual(new Set([3]));
    expect(Util.difference(setB, setA)).toEqual(new Set([4]));
  })
})

describe('isSorted', () => {
  test('should return false', () => {
    const word = ['one', 'two', 'three'];

    expect(Util.isSorted(word)).toBe(false);
  });

  test('should return true', () => {
    const word = ['one', 'three', 'two'];

    expect(Util.isSorted(word)).toBe(true);
  });
});

describe('includes', () => {
  test('should search case insenstively', () => {
    expect(Util.includes('foobarbaz', 'BAR')).toBe(true);
  });
});
