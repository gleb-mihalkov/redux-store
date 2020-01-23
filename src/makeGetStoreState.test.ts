import { assert } from 'chai';
import { makeGetStoreState } from './makeGetStoreState';
import { getStoreStateNotFoundError } from './getStoreStateNotFoundError';

describe('makeGetStoreState', () => {
  it('["foo"] => { "foo": 1 } => 1', () => {
    const getState = makeGetStoreState(['foo']);
    assert.equal(getState({ foo: 1 }), 1);
  });

  it('["foo", "bar"] => { "foo": { "bar": 1 } } => 1', () => {
    const getState = makeGetStoreState(['foo', 'bar']);
    assert.equal(getState({ foo: { bar: 1 } }), 1);
  });

  it('["foo", "bar"], 1 => { foo: {} } throws stateNotFound', () => {
    const getState = makeGetStoreState(['foo', 'bar']);

    assert.throws(
      () => getState({ foo: {} }),
      getStoreStateNotFoundError(['foo', 'bar'])
    );
  });

  it('["foo", "bar"] => { foo: { bar: undefined } } => undefined', () => {
    const getState = makeGetStoreState(['foo', 'bar']);
    assert.isUndefined(getState({ foo: { bar: undefined } }));
  });

  it('["foo"] => { foo: {} } => {} (memoized result)', () => {
    const getState = makeGetStoreState(['foo']);
    const rootState = { foo: {} };

    const valueA = getState(rootState);
    rootState.foo = {};
    const valueB = getState(rootState);

    assert.strictEqual(valueA, valueB);
  });

  it('["foo"] => { foo: { bar: 1 } } => { bar: 1 } (refresh cache)', () => {
    const getState = makeGetStoreState(['foo']);
    const valueA = getState({ foo: { bar: 1 } });
    const valueB = getState({ foo: { bar: 1 } });
    assert.notEqual(valueA, valueB);
  });
});
