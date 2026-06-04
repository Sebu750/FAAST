import { useEffect, lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const ForCreatives = lazy(() => import('./pages/ForCreatives'))
const ForPartners = lazy(() => import('./pages/ForPartners'))
const SpotlightEvent = lazy(() => import('./pages/SpotlightEvent'))
const SpotlightApplication = lazy(() => import('./pages/SpotlightApplication'))
const SpotlightAdmin = lazy(() => import('./pages/SpotlightAdmin'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Legal = lazy(() => import('./pages/Legal'))
const Terms = lazy(() => import('./pages/Terms'))
const SpotlightTerms = lazy(() => import('./pages/SpotlightTerms'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-[#bb9457] text-sm tracking-[0.3em] uppercase">Loading...</div>
  </div>
)

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <HelmetProvider>
      {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      <SpeedInsights />
      <Analytics />
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App
