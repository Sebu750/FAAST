import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ForCreatives from './pages/ForCreatives'
import ForPartners from './pages/ForPartners'
import SpotlightEvent from './pages/SpotlightEvent'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/for-creatives" element={<ForCreatives />} />
              <Route path="/for-partners" element={<ForPartners />} />
              <Route path="/spotlight-event" element={<SpotlightEvent />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
