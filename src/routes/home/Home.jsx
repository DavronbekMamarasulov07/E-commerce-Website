import AllProducsts from "../../components/all_products/AllProducsts"
import Brands from "../../components/brands/Brands"
import Hero from "../../components/hero/Hero"
import Navbar from "../../components/navbar/Navbar"
import NotificationMessage from "../../components/notification_message/NotificationMessage"




const Home = () => {





  return (
    <>
      <Navbar />
      <NotificationMessage />
      <Hero />
      <Brands />
      <AllProducsts />
    </>
  )
}

export default Home
