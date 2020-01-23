import { getEmptyStorePathError } from './getEmptyStorePathError';

/**
 * Возвращает массив, содержащий собственное имя хранилища и имя родительского
 * хранилища, если оно есть.
 * @param path Путь к состоянию хранилища.
 */
export const splitStorePath = (path: string[]) => {
  const { length } = path;

  if (length === 0) {
    throw new Error(getEmptyStorePathError());
  }

  const index = length - 1;

  const baseName = path[index];

  if (length === 1) {
    return [baseName];
  }

  const parentPath = path.slice(0, index);
  const parentName = parentPath.join('.');

  return [baseName, parentName];
};
