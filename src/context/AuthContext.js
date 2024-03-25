import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const [avatar, setAvatar] = useLocalStorage("avatar", "");
  const [banner, setBanner] = useLocalStorage("banner", "");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        name,
        setName,
        avatar,
        setAvatar,
        banner,
        setBanner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
