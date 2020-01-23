import { assert } from 'chai';
import { splitStorePath } from './splitStorePath';
import { getEmptyStorePathError } from './getEmptyStorePathError';

describe('splitStorePath', () => {
  it('["foo"] => ["foo"]', () => {
    assert.deepEqual(splitStorePath(['foo']), ['foo']);
  });

  it('["foo", "bar"] => ["bar", "foo"]', () => {
    assert.deepEqual(splitStorePath(['foo', 'bar']), ['bar', 'foo']);
  });

  it('["foo", "bar", "baz"] => ["baz", "foo.bar"]', () => {
    assert.deepEqual(splitStorePath(['foo', 'bar', 'baz']), ['baz', 'foo.bar']);
  });

  it('[] throws emptyStorePathError', () => {
    assert.throws(() => splitStorePath([]), getEmptyStorePathError());
  });
});
