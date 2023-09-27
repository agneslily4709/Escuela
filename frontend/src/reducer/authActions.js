
const login = (token) => {
        return { type: 'LOGIN', payload: { token } };
      };
      
      const logout = () => {
        return { type: 'LOGOUT' };
      };
      
      export { login, logout };