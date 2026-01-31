import Header from './components/Header'
import Nav from './components/Nav'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Squares from './components/Squares' // <--- Import Squares here

function App() {
  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500 selection:text-white">
      
      {/* --- GLOBAL BACKGROUND --- */}
      {/* 'fixed inset-0' makes it fill the screen and stay there while you scroll */}
      {/* 'z-0' puts it behind everything */}
      <div className="fixed inset-0 z-0 bg-slate-900">
          <Squares 
            direction="diagonal"
            speed={0.5}
            squareSize={40}
            borderColor="#334155" 
            hoverFillColor="#222"
          />
      </div>

      {/* --- MAIN CONTENT --- */}
      {/* 'relative z-10' ensures your text/buttons sit ON TOP of the background */}
      <div className="relative z-12">
        <Header />
        <Nav />
        <Experience />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App