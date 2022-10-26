import React, { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  isAuthenticated: false,
  accessToken: '',
  user: null,
}

export const AuthContext = createContext({ state: INITIAL_STATE, dispatch: () => null })

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('accessToken', action.payload.accessToken)
      return {
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      }
    case 'LOGOUT':
      localStorage.clear()
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
