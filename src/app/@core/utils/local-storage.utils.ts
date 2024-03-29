export enum StorageItem {
  Auth = 'App/auth',
  Theme = 'App/theme',
  AccessToken = 'App/access_token',
  RefreshToken = 'App/refresh_token'
}

export const getItem = (itemName: StorageItem): unknown | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: unknown): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
