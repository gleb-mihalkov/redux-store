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
  path: string[],
  initialState: S
): GetStoreState<S> => {
  let cachedRootState: RootState | undefined;
  let cachedState: S | undefined;
  let isCached = false;

  const { length: pathLength } = path;
  const lastIndex = pathLength - 1;

  const findState = (rootState: RootState): S => {
    let currentNode: any = rootState;

    for (let i = 0; i < pathLength; i += 1) {
      const property = path[i];
      const nextNode = currentNode[property];

      if (nextNode === undefined && i < lastIndex) {
        throw new Error(getStoreStateNotFoundError(path));
      }

      currentNode = nextNode;
    }

    const state = currentNode === undefined ? initialState : currentNode;
    return state;
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
