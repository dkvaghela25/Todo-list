import { jwtDecode } from "jwt-decode";

const isLoggedin = () => {

  const token = localStorage.getItem("token");

  if (token) {

    console.log("Token found:", token);

    const decodedToken = jwtDecode(token);

    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime > expirationTime) {
      console.log("Token expired");
      localStorage.removeItem("token");

      return false;
    } else {
      console.log("Token is valid");
      return true;
    }
  } else {
    return false;
  }

};

export default isLoggedin;
