function setLocalStorage<T>(key: string, value: T) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

function getLocalStorage(key: string) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (!serializedValue) return null;

    return JSON.parse(serializedValue) as unknown;
  } catch (error) {
    console.error("Error retrieving from localStorage", error);
    return null;
  }
}

function getCookie(key: string): string | null {
  const cookies = document.cookie
    .split(";")
    // Filter out the cookie matching key name
    .filter((cookie) => cookie.substring(0, key.length + 1) === `${key}=`)
    // Decode the value part of the cookie
    .map((cookie) => cookie.substring(key.length + 1));

  return cookies[0] ?? null;
}

export { setLocalStorage, getLocalStorage, getCookie };
