import { createContext } from 'react';
export const AuthContext = createContext({
  user: {
    message: '',
    userId: '',
    username: '',
  },
  onSignOut: () => {},
});
