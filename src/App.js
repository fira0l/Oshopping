import './App.css';
import CartS from './Pages/CartS';
import ShopCategory from './Pages/ShopCategory';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Shop from './Pages/Shop';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import SignupPage from './Pages/SignupPage';
import Checkout from './Pages/Checkout';
import ForgotP from './Pages/ForgotP';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS =  gql`
query GetLocations {
  locations {
    id
    name
    description
    photo
  }
}
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

function App() {
  return (
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
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<CartS/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/forgot' element={<ForgotP/>}/>

        </Routes>  
        {/* <br/>
        <DisplayLocations /> */}
        <Footer/>
        </BrowserRouter>
        
    </div>
  );
}

export default App;

