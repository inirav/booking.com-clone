import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

type Props = {}

const Logout = (props: Props) => {
  const { dispatch } = useContext(AuthContext)
  dispatch({ type: 'LOGOUT' })

  return <Navigate to="/login" />
}

export default Logout
