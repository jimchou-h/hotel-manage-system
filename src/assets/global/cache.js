function get(key, obj = false) {
  return obj ? JSON.parse(sessionStorage.getItem(key)) : sessionStorage.getItem(key)
};

function set(key, value, obj = false) {
  return obj ? sessionStorage.setItem(key, JSON.stringify(value)) : sessionStorage.setItem(key, value)
};

function remove(key) {
  return sessionStorage.removeItem(key);
}


export default {
  get,
  set,
  remove
}