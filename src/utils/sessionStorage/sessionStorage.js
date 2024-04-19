// sessionStorage.js

export const setUserToken = (token) => {
  sessionStorage.setItem('userToken', token);
};

export const getUserToken = () => {
 
  const userToken = sessionStorage.getItem('userToken');;
  console.log("User Token:", userToken); // Log the user token
  return userToken;
};

export const clearUserToken = () => {
  sessionStorage.removeItem('userToken');
};

export const isAuthenticated = () => {
  return !!getUserToken();
};