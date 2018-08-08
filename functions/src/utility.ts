export const normalizeSnapshots = (snapshot: any) => {
  const items = []
  snapshot
    .forEach(child => {
      const value = child.val()
      const $key = child.key
      items.push({ ...value, $key })
    })
  return items
}