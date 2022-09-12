import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  city: '',
  dates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ],
  guests: {
    adults: 2,
    childern: 0,
    rooms: 1,
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
