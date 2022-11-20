import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import HeaderHero from '../HeaderHero'
import HeaderSearch from '../HeaderSearch'
import Navbar from '../Navbar'
import NavbarMenu from '../NavbarMenu'
import NewsLetter from '../NewsLetter'
import { Header, Main } from './styles'

type Props = {}

const Layout = (props: Props) => {
  const location = useLocation()

  return (
    <>
      <Header>
        <Navbar />
        <NavbarMenu />
        {location.pathname === '/' && (
          <>
            <HeaderHero />
            <HeaderSearch />
          </>
        )}
      </Header>
      <Main>
        <Outlet />
      </Main>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default Layout
