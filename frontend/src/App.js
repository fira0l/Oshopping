import './App.css';
import CartS from './Pages/CartS';
import ShopCategory from './Pages/ShopCategory';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import ProductDisplay from './Pages/ProductDisplay';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import SignupPage from './Pages/SignupPage';
import Checkout from './Pages/Checkout';
import ForgotP from './Pages/ForgotP';
import OrderHistory from './Pages/OrderHistory';
import ResetPassword from './Pages/ResetPassword';


function App() {
  return (
    <div> 
      <BrowserRouter>
       <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/men' element={<ShopCategory category="55" />} />
          <Route path='/women' element={<ShopCategory category="56" />} />
          <Route path='/kids' element={<ShopCategory category="57" />} />
          <Route path='/house' element={<ShopCategory category="58" />} />
          <Route path='/product/:productId' element={<ProductDisplay />} />
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<CartS/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/forgot' element={<ForgotP/>}/>
          <Route path='/order-history' element={<OrderHistory/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>


          
        </Routes>  
        <Footer/>
        </BrowserRouter>

    </div>
  );
}

export default App;




