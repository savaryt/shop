export function getDbId(storeId: string) {
  return storeId.split('-')[0];
}
export function getStoreId(dbId: string, size: string) {
  return `${dbId}-${size}`
}