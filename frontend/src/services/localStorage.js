const USER_KEY = "appUser";
const TOKEN = "appToken";

export const setUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};

export const getUser = () => {
  return localStorage.getItem(USER_KEY) || "";
};

export const removeUser = () => {
  return localStorage.removeItem(USER_KEY) || "";
};

export const setToken = (token) => {
  localStorage.removeItem(TOKEN);
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN);
};
