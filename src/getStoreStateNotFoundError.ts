/**
 * Возвращает сообщение об ошибке, возникающей, если состояние по указанному
 * пути не найдено в глобальном состоянии приложения.
 * @param path Путь к состоянию хранилища.
 */
export const getStoreStateNotFoundError = (path: string[]) =>
  `State ${path.join('.')} not found`;
