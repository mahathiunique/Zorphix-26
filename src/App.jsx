import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import EventsPage from './components/EventsPage'
import Register from './components/Register'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Background from './components/Background'
import CurrencyBackground from './components/CurrencyBackground'
import CoinBackground from './components/CoinBackground'

const App = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-mono">
      <Background />
      <CurrencyBackground />
      <CoinBackground />
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App