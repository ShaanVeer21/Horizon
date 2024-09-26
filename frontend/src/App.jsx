import Footer from "./components/Footer"
import Header from "./components/Header"
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen"
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen"


function App() {

  return (
    <Router>
      <Header />
      <main className="py-3">
      <Container>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/products/:id" element={<ProductScreen />} />
      </Routes>
        
      </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
