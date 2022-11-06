import React, { createContext, useReducer } from 'react'
import { User } from '../interfaces/users'

type State = {
  isAuthenticated: boolean
  accessToken: string
  user: User | null
}

type Action = { type: 'LOGIN'; payload: { accessToken: string; user: User } } | { type: 'LOGOUT' }

type Props = { children: React.ReactNode }

const INITIAL_STATE: State = {
  isAuthenticated: false,
  accessToken: '',
  user: null,
}

export const AuthContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({ state: INITIAL_STATE, dispatch: () => null })

const reducer = (state: State, action: Action): State => {
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

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
