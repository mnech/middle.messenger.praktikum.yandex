export function getStub(id: string): string {
  return `<div data-id="${id}"></div>`;
}

export function getStubSelector(id: string): string {
  return `[data-id="${id}"]`;
}
