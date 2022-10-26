import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { Container, Content, Main } from './styles'

type Props = {}

const Layout = (props: Props) => {
  const { state } = useContext(AuthContext)

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <Container>
      <Sidebar />
      <Main>
        <Header />
        <Content>{<Outlet />}</Content>
      </Main>
    </Container>
  )
}

export default Layout
