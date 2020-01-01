  import React, { useReducer, useContext } from 'react';  

const initialState: string = ''

const FilterContext = React.createContext([])

const filterReducer = (state: string, action: {payload: string}) => {
  return action.payload
}

export const FilterProvider = ({children}) => {

  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
   // new
    <FilterContext.Provider value={[state, dispatch]}>
      {children}
    </FilterContext.Provider>
  );
}

const useGlobalFilter = () => {
  const [state, dispatch] = useContext(FilterContext)

  const setFilter = (newValue: string) => {
    dispatch({payload: newValue})
  }

  return [
    state.filter,
    setFilter
  ]
}

export default useGlobalFilter;