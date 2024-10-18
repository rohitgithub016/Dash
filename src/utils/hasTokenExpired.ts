const hasTokenExpired = () => {
  const tokenExpiryDate = localStorage.getItem("expirationTime");
  let tokenExpired = true;
  if (tokenExpiryDate) {
    tokenExpired = new Date() > new Date(tokenExpiryDate);
  }
  return tokenExpired;
};

export default hasTokenExpired;
