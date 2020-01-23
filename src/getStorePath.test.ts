import { assert } from 'chai';
import { getStorePath } from './getStorePath';
import { getEmptyStoreNameError } from './getEmptyStoreNameError';

describe('getStorePath', () => {
  it('"foo" => ["foo"]', () => {
    assert.deepEqual(getStorePath('foo'), ['foo']);
  });

  it('"foo.bar" => ["foo", "bar"]', () => {
    assert.deepEqual(getStorePath('foo.bar'), ['foo', 'bar']);
  });

  it('"" throws emptyStoreNameError', () => {
    assert.throws(() => getStorePath(''), getEmptyStoreNameError());
  });
});
