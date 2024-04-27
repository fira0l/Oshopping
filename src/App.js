import './App.css';
import CartS from './Pages/CartS';
import ShopCategory from './Pages/ShopCategory';
import ContactUs from './Pages/ContactUs';
import LoginSignup from './Pages/LoginSignup';
import Products from './Pages/Products';
import Shop from './Pages/Shop';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
// import men_banner from './components/Assets/mens-banner.jpg';
// import women_banner from './components/Assets/womens-banner.jpg';
// import kids_banner from './components/Assets/kids-banner.jpg';
// import house_banner from './components/Assets/home-appliances-banner-1024x479.jpg';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import Checkout from './Pages/Checkout';


function App() {
  return (
  <Provider store={store}>
    <div> 
      <BrowserRouter>
       <Navbar/>
       <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory category="men"/>}/>
          <Route path='/women' element={<ShopCategory category="women"/>}/>
          <Route path='/kids' element={<ShopCategory category="kids"/>}/>
          <Route path='/house' element={<ShopCategory   category="house"/>}/>
          <Route path='/product' element={<Products/>}>
            <Route path=':productId' element={<Products/>}/>
          </Route>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path='/cart' element={<CartS/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          

        </Routes>  
        <Footer/>
        </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">  
//      <h1>hello</h1>
//     </div>
//   );
// }




// <Route path='/men' element={<ShopCategory banner={men_banner}  category="men"/>}/>
// <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
// <Route path='/kids' element={<ShopCategory banner={kids_banner}  category="kids"/>}/>
// <Route path='/house' element={<ShopCategory banner={house_banner}   category="house"/>}/>