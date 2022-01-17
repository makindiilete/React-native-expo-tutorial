//we get the user object from the authContext so we can get d name and email
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  // we receive the token passed, decode it, we update the user in d state and store the token in the authStorage
  const logIn = (authToken) => {
    console.log("x-auth-token = ", authToken);
    const user = jwtDecode(authToken);
    // here we call d setUser function of the authContext and pass the user object....
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return { user, logIn, logOut };
}
