import React, { useReducer, useContext } from 'react';  

interface IUser {
  name?: string;
  email?: string;
  photoUrl?: string;
  emailVerified?: string;
  uid?: string;
}

const initialState: IUser = {}

const UserContext = React.createContext([])

const UserReducer = (state: IUser, action: {payload: IUser}) => {
  return action.payload
}

export const UserProvider = ({children}) => {

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
   // new
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

const useGlobalUser = () => {
  const [state, dispatch] = useContext(UserContext)

  const setUser = (newValue: IUser) => {
    dispatch({payload: newValue})
  }

  return [
    state.User,
    setUser
  ]
}

export default useGlobalUser;