import { StoreState } from './StoreState';

/**
 * Извлекает данные из состояния хранилища.
 * @param state Состояние хранилища.
 */
export type GetStoreStateData<S extends StoreState> = (state: S) => any;
