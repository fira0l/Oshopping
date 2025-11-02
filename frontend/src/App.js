
import CartS from './Pages/CartS';
import ShopCategory from './Pages/ShopCategory';
import ContactUs from './Pages/ContactUs';
import LoginShadcn from './Pages/LoginShadcn';
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
import TestShadcn from './TestShadcn';
import TestProductCard from './TestProductCard';
import { ThemeProvider } from './Context/ThemeContext';


function App() {
  return (
    <ThemeProvider>
      <div> 
        <BrowserRouter>
         <Navbar className="mb-15"/>
         <div className="">
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/men' element={<ShopCategory category="55" />} />
            <Route path='/women' element={<ShopCategory category="56" />} />
            <Route path='/kids' element={<ShopCategory category="57" />} />
            <Route path='/house' element={<ShopCategory category="58" />} />
            <Route path='/category/:categoryId' element={<ShopCategory />} />
            <Route path='/shop' element={<ShopCategory />} />
            <Route path='/deals' element={<ShopCategory />} />
            <Route path='/about' element={<ContactUs/>}/>
            <Route path='/product/:productId' element={<ProductDisplay />} />
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/login' element={<LoginShadcn/>}/>
            <Route path='/cart' element={<CartS/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/forgot' element={<ForgotP/>}/>
            <Route path='/order-history' element={<OrderHistory/>}/>
            <Route path='/reset-password/:token' element={<ResetPassword/>}/>
            <Route path='/test' element={<TestShadcn/>}/>
            <Route path='/test-product' element={<TestProductCard/>}/>
          </Routes>
          </div>
          <Footer/>
          </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
