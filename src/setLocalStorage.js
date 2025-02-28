function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default setLocalStorage;
