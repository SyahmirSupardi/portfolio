import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'
import Portfolio from './components/Portfolio'

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content">
        <Header />
        <div className="showcase-layout">
          <Portfolio />
          <Experience />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
