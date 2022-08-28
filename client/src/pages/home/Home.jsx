import { Fragment } from 'react'
import Featured from '../../components/featured/Featured'
import Header from '../../components/header/Header'
import './home.scss'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <Fragment>
      <Header isHomePage={true} />
      <div className="bodyContainer">
        <Featured />
      </div>
      <Footer />
    </Fragment>
  )
}

export default Home
