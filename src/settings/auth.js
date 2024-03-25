import useLocalStorage from "../hooks/useLocalStorage";

export const useMyAuth = () => {
  const [token] = useLocalStorage("token", "");
  const authToken = "Bearer " + token;
  return authToken;
};
