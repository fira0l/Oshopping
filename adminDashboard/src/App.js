import './App.css';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList';
import Category from './pages/Category';
import Product from './pages/Product';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:1000',
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reset-password/:token' element={<Resetpassword/>}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
        <Route path='/admin' element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='customers' element={<Customers/>}/>
          <Route path='list-category' element={<CategoryList/>}/>
          <Route path='product-list' element={<ProductList/>}/>
          <Route path='category' element={<Category/>}/>
          <Route path='product' element={<Product/>}/>  

       </Route>
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
