import { StoreState } from './StoreState';
import { GetStoreState } from './GetStoreState';
import { CreateStoreSelector } from './CreateStoreSelector';

/**
 * Экземпляр хранилища.
 */
export interface Store<S extends StoreState> {
  /**
   * Полное имя хранилища.
   */
  name: string;

  /**
   * Собственное имя хранилища.
   */
  baseName: string;

  /**
   * Полное имя родительского хранилища.
   */
  parentName?: string;

  /**
   * Путь к состоянию хранилища в глобальном состоянии.
   */
  path: string[];

  /**
   * Извлекает состояние хранилища из глобального состояния приложения.
   * @param rootState Глобальное состояние приложения.
   */
  getState: GetStoreState<S>;

  /**
   * Создает селектор, который извлекает данные из состояния хранилища с
   * помощью указанной функции.
   * @param getData Извлекает данные из состояния хранилища.
   */
  createSelector: CreateStoreSelector<S>;
}
