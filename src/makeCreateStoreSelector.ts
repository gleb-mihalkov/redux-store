import { StoreState } from './StoreState';
import { GetStoreState } from './GetStoreState';
import { CreateStoreSelector } from './CreateStoreSelector';
import { GetStoreStateData } from './GetStoreStateData';

/**
 * Создает функцию, которая получает селектор, извлекающий данные из состояния
 * хранилища.
 * @param getState Извлекает состояние хранилища из глобального состояния.
 */
export const makeCreateStoreSelector = <S extends StoreState>(
  getState: GetStoreState<S>
): CreateStoreSelector<S> => <G extends GetStoreStateData<S>>(getData: G) => {
  type D = ReturnType<G>;

  let cachedState: S | undefined;
  let cachedData: D | undefined;
  let isCached = false;

  return (rootState): D => {
    const state = getState(rootState);

    if (isCached && cachedState === state) {
      return cachedData as D;
    }

    const data = getData(state);

    cachedState = state;
    cachedData = data;
    isCached = true;

    return data;
  };
};
