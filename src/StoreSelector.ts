import { RootState } from './RootState';
import { GetStoreStateData } from './GetStoreStateData';
import { StoreState } from './StoreState';

/**
 * Селектор, который извлекает данные из глобального состояния приложения.
 * @param rootState Глобальное состояние приложения.
 */
export type StoreSelector<
  S extends StoreState,
  D extends GetStoreStateData<S>
> = (rootState: RootState) => ReturnType<D>;
