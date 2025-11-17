import { createContext, useContext, useState } from 'react';
import { login as apiLogin, setToken, getToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: getToken(),
    loading: false,
    error: null
  });

  const login = async (username, password) => {
    setAuth(a => ({ ...a, loading: true, error: null }));
    try {
      const data = await apiLogin(username, password);
      setToken(data.token);
      setAuth({ user: data.user, token: data.token, loading: false, error: null });
      return true;
    } catch (e) {
      setAuth(a => ({ ...a, loading: false, error: e.message || 'Error' }));
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAuth({ user: null, token: null, loading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}