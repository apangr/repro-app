export function removeWhitespaces(item: string): string {
  return item.replace(/\s/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeObjectWithId(arr: any[], id: string) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}
