const initialState = {
        token: null,
        isAuthenticated: false,
      };
      
      const authReducer = (state, action) => {
        console.log(state)
        switch (action.type) {
          case 'LOGIN':
            return {
              ...state,
              token: action.payload.token,
              isAuthenticated: true,
            };
          case 'LOGOUT':
            return {
              ...state,
              token: null,
              isAuthenticated: false,
            };
          default:
            return state;
        }
      };
      
      export { initialState, authReducer };
      