import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ForCreatives from './pages/ForCreatives'
import ForPartners from './pages/ForPartners'
import SpotlightEvent from './pages/SpotlightEvent'
import SpotlightApplication from './pages/SpotlightApplication'
import SpotlightAdmin from './pages/SpotlightAdmin'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Marketplace from './pages/Marketplace'
import Legal from './pages/Legal'
import Terms from './pages/Terms'
import SpotlightTerms from './pages/SpotlightTerms'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin routes - no header/footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/spotlight" element={<SpotlightAdmin />} />
          
          {/* Website routes - with header/footer */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col overflow-x-hidden">
              <Header />
              <main className="flex-grow overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/for-creatives" element={<ForCreatives />} />
                  <Route path="/for-partners" element={<ForPartners />} />
                  <Route path="/spotlight-event" element={<SpotlightEvent />} />
                  <Route path="/spotlight/apply" element={<SpotlightApplication />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/legal/privacy" element={<Legal />} />
                  <Route path="/legal/terms" element={<Terms />} />
                  <Route path="/legal/spotlight-terms" element={<SpotlightTerms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
