import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import ItemSe from '../components/Items/ItemSe';
import SortBy from '../components/SortBy/SortBy'; // Import SortBy
import { IoMdSearch } from "react-icons/io"; // Import IoMdSearch

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [selectedSort, setSelectedSort] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to sort products based on the selected sorting option
    const sortProducts = (products, sortOption) => {
        let sortedProducts = [...products];
        switch (sortOption) {
            case 'price_asc':
                sortedProducts.sort((a, b) => a.new_price - b.new_price);
                break;
            case 'price_desc':
                sortedProducts.sort((a, b) => b.new_price - a.new_price);
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
        return products.filter((product) => product.category === category);
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
    let filteredProducts = filterByCategory(all_product, props.category);
    filteredProducts = filterBySearch(filteredProducts, searchQuery);
    if (selectedSort) {
        filteredProducts = sortProducts(filteredProducts, selectedSort);
    }

    return (
        <div className="shop-category">
            {/* <img className="shopcategory-banner" src={props.banner} alt="Shop Banner" /> */}

            {/* Search and SortBy */}
            <div className="shopcategory-indexSort">
                {/* Search input */}
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

                {/* SortBy button */}
                <SortBy onSortChange={setSelectedSort} />
            </div>

            {/* Display filtered and sorted products */}
            <div className="shopcategory-products">
                {filteredProducts.map((item, i) => (
                    <ItemSe
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;




