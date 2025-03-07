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
export { setLocalStorage, getLocalStorage };
