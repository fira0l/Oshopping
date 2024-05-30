import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import SortBy from '../components/SortBy/SortBy'; 
import { IoMdSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to sort products based on the selected sorting option
  const sortProducts = (products, sortOption) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Filter products based on category
  const filterByCategory = (products, category) => {
    return products.filter((product) => product.category_id === category);
  };

  // Filter products based on search query
  const filterBySearch = (products, query) => {
    return products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  };

  // Handle changes to the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get filtered and sorted products
  let filteredProducts = filterByCategory(allProducts, props.category);
  filteredProducts = filterBySearch(filteredProducts, searchQuery);
  if (selectedSort) {
    filteredProducts = sortProducts(filteredProducts, selectedSort);
  }

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <div className="flex items-center bg-white rounded-md px-4 py-2 mt-6">
          <input
            type="text"
            className="outline-none w-50"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoMdSearch size={20} />
        </div>
        <SortBy onSortChange={setSelectedSort} />
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map(product => (
          <div key={product.product_id}>
            <Link to={`/product/${product.product_id}`}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <h1>{product.price} Birr</h1>

            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
