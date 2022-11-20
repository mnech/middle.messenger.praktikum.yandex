export function getStub(id: string, contents?): string {
  return `<div data-id="${id}">${contents}</div>`;
}

export function getStubSelector(id: string): string {
  return `[data-id="${id}"]`;
}
