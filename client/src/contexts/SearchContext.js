import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  guests: {
    adults: undefined,
    childern: undefined,
    rooms: undefined,
  },
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload

    default:
      return state
  }
}

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

  return <SearchContext.Provider value={{ ...state, dispatch }}>{children}</SearchContext.Provider>
}
