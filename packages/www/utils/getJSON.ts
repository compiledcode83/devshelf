export async function getJSON(response: Response): Promise<unknown | undefined> {
  const contentType = response.headers.get('Content-Type');
  const emptyCodes = [204, 205];
  if (!emptyCodes.includes(response.status) && contentType?.includes('json')) {
    return response.json();
  } else {
    return undefined;
  }
}
