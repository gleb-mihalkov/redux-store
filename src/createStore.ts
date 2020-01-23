import { Store } from './Store';
import { getEmptyStoreNameError } from './getEmptyStoreNameError';
import { getStorePath } from './getStorePath';
import { splitStorePath } from './splitStorePath';

/**
 * Создает хранилище с указанным именем.
 * @param name Полное имя хранилища.
 */
export const createStore = (name: string): Store => {
  if (!name) {
    throw new Error(getEmptyStoreNameError());
  }

  const path = getStorePath(name);
  const [baseName, parentName] = splitStorePath(path);

  return {
    name,
    baseName,
    parentName,
    path
  };
};
