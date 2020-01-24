import { StoreState } from './StoreState';
import { GetStoreStateData } from './GetStoreStateData';
import { StoreSelector } from './StoreSelector';

/**
 * Создает селектор, который извлекает данные из состояния хранилища с помощью
 * указанной функции.
 * @param getData Извлекает данные из состояния хранилища.
 */
export type CreateStoreSelector<S extends StoreState> = <
  D extends GetStoreStateData<S>
>(
  getData: D
) => StoreSelector<S, D>;
