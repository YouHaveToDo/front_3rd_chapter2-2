export function toggleSet(set: Set<string>, id: string) {
  const newSet = new Set(set);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  return newSet;
}
