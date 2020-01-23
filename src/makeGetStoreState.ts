import { StoreState } from './StoreState';
import { GetStoreState } from './GetStoreState';
import { RootState } from './RootState';
import { getStoreStateNotFoundError } from './getStoreStateNotFoundError';

/**
 * Создает функцию, которая извлекает состояние хранилища из глобального
 * состояния приложения.
 * @param path Путь к состоянию хранилища в глобальном состоянии.
 * @param initialState Начальное состояние хранилища.
 */
export const makeGetStoreState = <S extends StoreState>(
  path: string[]
): GetStoreState<S> => {
  let cachedRootState: RootState | undefined;
  let cachedState: S | undefined;
  let isCached = false;

  const { length: pathLength } = path;

  const findState = (rootState: RootState): S => {
    let node: any = rootState;

    for (let i = 0; i < pathLength; i += 1) {
      const property = path[i];

      if (!(property in node)) {
        throw new Error(getStoreStateNotFoundError(path));
      }

      node = node[property];
    }

    return node;
  };

  return (rootState): S => {
    if (isCached && rootState === cachedRootState) {
      return cachedState as S;
    }

    const state = findState(rootState);

    cachedRootState = rootState;
    cachedState = state;
    isCached = true;

    return state;
  };
};
