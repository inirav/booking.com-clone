import { createContext, useReducer } from 'react'
import { Group } from '../interfaces/search'

type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_DATES'; payload: { startDate: Date; endDate: Date } }
  | { type: 'SET_GROUP'; payload: Group }
  | { type: 'SET_SEARCH'; payload: any }

type Props = { children: React.ReactNode }

const INITIAL_STATE = {
  city: '',
  dates: {
    startDate: new Date(),
    endDate: new Date(),
  },
  group: {
    adults: 2,
    children: 0,
    rooms: 1,
  },
}

export const SearchContext = createContext<{
  state: typeof INITIAL_STATE
  dispatch: React.Dispatch<Action>
}>({ state: INITIAL_STATE, dispatch: () => null })

const reducer = (state: typeof INITIAL_STATE, action: Action): typeof INITIAL_STATE => {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload }
    case 'SET_DATES':
      return { ...state, dates: action.payload }
    case 'SET_GROUP':
      return { ...state, group: action.payload }
    case 'SET_SEARCH':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const SearchContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>
}
