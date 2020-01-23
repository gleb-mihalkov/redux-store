import { assert } from 'chai';
import { makeGetStoreState } from './makeGetStoreState';
import { getStoreStateNotFoundError } from './getStoreStateNotFoundError';

describe('makeGetStoreState', () => {
  it('["foo"], 1 => { "foo": 2 } => 2', () => {
    const getState = makeGetStoreState(['foo'], 1);
    assert.equal(getState({ foo: 2 }), 2);
  });

  it('["foo", "bar"], 1 => { "foo": { "bar": 2 } } => 2', () => {
    const getState = makeGetStoreState(['foo', 'bar'], 1);
    assert.equal(getState({ foo: { bar: 2 } }), 2);
  });

  it('["foo", "bar"], 1 => { foo: {} } => 1', () => {
    const getState = makeGetStoreState(['foo', 'bar'], 1);
    assert.equal(getState({ foo: {} }), 1);
  });

  it('["foo", "bar"], 1 => {} throws stateNotFound', () => {
    const getState = makeGetStoreState(['foo', 'bar'], 1);
    assert.throws(
      () => getState({}),
      getStoreStateNotFoundError(['foo', 'bar'])
    );
  });
});
