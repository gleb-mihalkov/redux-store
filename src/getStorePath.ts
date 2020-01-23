import { getEmptyStoreNameError } from './getEmptyStoreNameError';

/**
 * Возвращает путь к состоянию хранилища в глобальном состоянии.
 * @param name Полное имя хранилища.
 */
export const getStorePath = (name: string) => {
  if (!name) {
    throw new Error(getEmptyStoreNameError());
  }

  return name.split('.');
};
