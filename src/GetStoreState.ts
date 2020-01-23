import { StoreState } from './StoreState';
import { RootState } from './RootState';

/**
 * Извлекает состояние хранилища из глобального состояния приложения.
 * @param rootState Глобальное состояние хранилища.
 */
export type GetStoreState<S extends StoreState> = (rootState: RootState) => S;
