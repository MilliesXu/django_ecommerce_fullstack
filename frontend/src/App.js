import { Container } from "react-bootstrap";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
